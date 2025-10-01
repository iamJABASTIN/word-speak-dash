import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface WordData {
  word: string;
  meaning: string;
}

export const WordDisplay = () => {
  const [wordData, setWordData] = useState<WordData>({
    word: "Click below to start",
    meaning: "Generate a random word to begin your practice session",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomWord = async () => {
    setIsLoading(true);
    try {
      // Fetch a random word from a simple list
      const words = [
        "serendipity", "eloquent", "resilient", "ephemeral", "meticulous",
        "ambiguous", "ubiquitous", "pragmatic", "innovative", "paradox",
        "catalyst", "authentic", "transparent", "empathy", "integrity",
        "perspective", "versatile", "dynamic", "collaborate", "sustainable"
      ];
      
      const randomWord = words[Math.floor(Math.random() * words.length)];
      
      // Fetch definition from Free Dictionary API
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
      );
      
      if (!response.ok) throw new Error("Failed to fetch word");
      
      const data = await response.json();
      const meanings = data[0]?.meanings[0]?.definitions[0]?.definition;
      
      setWordData({
        word: randomWord,
        meaning: meanings || "A meaningful word to discuss and explore",
      });
      
      toast.success("New word generated!");
    } catch (error) {
      toast.error("Failed to fetch word. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 h-full flex flex-col items-center justify-center space-y-6 shadow-lg">
      <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
        <h1 className="text-6xl font-bold text-foreground tracking-tight">
          {wordData.word}
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          {wordData.meaning}
        </p>
      </div>
      
      <Button
        onClick={fetchRandomWord}
        disabled={isLoading}
        size="lg"
        className="w-full max-w-xs"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading...
          </>
        ) : (
          "Generate Word"
        )}
      </Button>
    </Card>
  );
};
