import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";

export const VoiceTranscription = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast.error("Speech recognition is not supported in this browser");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece + " ";
        } else {
          interimTranscript += transcriptPiece;
        }
      }

      setTranscript((prev) => prev + finalTranscript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        toast.error("Microphone access denied");
      } else {
        toast.error("Speech recognition error");
      }
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        recognitionRef.current.start();
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      toast.success("Stopped recording");
    } else {
      setTranscript("");
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
          <h2 className="text-2xl font-bold text-foreground">Live Transcription</h2>
          <div className="flex gap-2">
            <Button
              onClick={toggleListening}
              variant={isListening ? "destructive" : "default"}
              className="gap-2"
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
              <Button onClick={clearTranscript} variant="outline">
                Clear
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-64 w-full rounded-md border bg-muted/30 p-4">
          {transcript ? (
            <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
              {transcript}
            </p>
          ) : (
            <p className="text-muted-foreground italic">
              {isListening
                ? "Listening... Start speaking to see your transcription here."
                : "Click 'Start Speaking' to begin transcription."}
            </p>
          )}
        </ScrollArea>
      </div>
    </Card>
  );
};
