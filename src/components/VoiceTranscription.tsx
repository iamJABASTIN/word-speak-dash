import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, Trash2 } from "lucide-react";
import { toast } from "sonner";

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

export const VoiceTranscription = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const lastResultRef = useRef<boolean>(false);

  const initializeSpeechRecognition = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast.error("Speech recognition is not supported in this browser");
      return null;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    return recognition;
  };

  useEffect(() => {
    const handleRecognitionError = async (event: any) => {
      console.error("Speech recognition error:", event.error);

      if (event.error === "not-allowed") {
        toast.error("Microphone access denied");
        setIsListening(false);
        return;
      }

      if (event.error === "aborted") {
        // Skip retry if we're manually stopping or already have results
        if (isStopping || lastResultRef.current) {
          return;
        }

        if (isListening && retryCount < MAX_RETRY_ATTEMPTS) {
          setIsRetrying(true);
          setRetryCount((prev) => prev + 1);
          
          try {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            
            if (isListening && !isStopping) {
              recognitionRef.current = initializeSpeechRecognition();
              if (!recognitionRef.current) return;
              
              setupRecognitionHandlers();
              recognitionRef.current.start();
              toast.info(`Reconnecting... Attempt ${retryCount + 1}/${MAX_RETRY_ATTEMPTS}`);
            }
          } catch (error) {
            console.error("Error during retry:", error);
            setIsListening(false);
            setIsRetrying(false);
            toast.error("Failed to reconnect");
          } finally {
            setIsRetrying(false);
          }
        } else if (isListening) {
          setIsListening(false);
          toast.error("Speech recognition was interrupted");
        }
      } else {
        setIsListening(false);
        toast.error(`Speech recognition error: ${event.error}`);
      }
    };

    const setupRecognitionHandlers = () => {
      if (!recognitionRef.current) return;

      recognitionRef.current.onstart = () => {
        lastResultRef.current = false;
        setIsStopping(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening && !isStopping && !isRetrying) {
          recognitionRef.current?.start();
        }
      };

      recognitionRef.current.onerror = handleRecognitionError;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece + " ";
            lastResultRef.current = true;
          } else {
            interimTranscript += transcriptPiece;
          }
        }

        if (finalTranscript) {
          setTranscript((prev) => prev + finalTranscript);
        }
      };
    };

    recognitionRef.current = initializeSpeechRecognition();
    if (recognitionRef.current) {
      setupRecognitionHandlers();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening, isStopping, retryCount, isRetrying]);

  const toggleListening = async () => {
    if (isRetrying) {
      toast.error("Please wait while reconnecting...");
      return;
    }

    if (isListening) {
      setIsStopping(true);
      recognitionRef.current?.stop();
      setIsListening(false);
      setRetryCount(0);
      toast.success("Stopped recording");
    } else {
      setTranscript("");
      setRetryCount(0);
      setIsStopping(false);
      recognitionRef.current?.start();
      setIsListening(true);
      toast.success("Started recording");
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    toast.success("Transcript cleared");
  };

  return (
    <Card className="p-6 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Live Transcription
            {isRetrying && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                (Reconnecting... {retryCount}/{MAX_RETRY_ATTEMPTS})
              </span>
            )}
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={toggleListening}
              variant={isListening ? "destructive" : "default"}
              className="gap-2"
              disabled={isRetrying}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  Stop Speaking
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  Start Speaking
                </>
              )}
            </Button>
            {transcript && (
              <Button onClick={clearTranscript} variant="outline" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="h-[200px] w-full border rounded-md p-4">
          {transcript || "Start speaking to see transcription here..."}
        </ScrollArea>
      </div>
    </Card>
  );
};