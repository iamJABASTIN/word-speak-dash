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
        "love",
        "hate",
        "joy",
        "sadness",
        "anger",
        "fear",
        "hope",
        "dream",
        "trust",
        "friendship",
        "birth",
        "death",
        "cry",
        "laugh",
        "smile",
        "respect",
        "peace",
        "war",
        "happiness",
        "loneliness",
        "kindness",
        "patience",
        "faith",
        "belief",
        "truth",
        "lie",
        "help",
        "hurt",
        "comfort",
        "pain",
        "cup",
        "book",
        "phone",
        "car",
        "pen",
        "pencil",
        "bed",
        "shoes",
        "clothes",
        "food",
        "water",
        "house",
        "door",
        "window",
        "chair",
        "table",
        "bag",
        "bottle",
        "watch",
        "key",
        "computer",
        "laptop",
        "tv",
        "radio",
        "lamp",
        "mirror",
        "sofa",
        "clock",
        "wallet",
        "bike",
        "health",
        "exercise",
        "sleep",
        "diet",
        "brain",
        "heart",
        "hand",
        "eye",
        "face",
        "hair",
        "pain",
        "medicine",
        "hospital",
        "doctor",
        "nurse",
        "blood",
        "tooth",
        "ear",
        "leg",
        "mouth",
        "breath",
        "skin",
        "virus",
        "disease",
        "injury",
        "surgery",
        "treatment",
        "care",
        "wellness",
        "strength",
        "career",
        "job",
        "success",
        "failure",
        "win",
        "lose",
        "goal",
        "opportunity",
        "learning",
        "growth",
        "education",
        "teacher",
        "student",
        "money",
        "salary",
        "boss",
        "employee",
        "company",
        "work",
        "study",
        "exam",
        "test",
        "skill",
        "knowledge",
        "wisdom",
        "leader",
        "team",
        "project",
        "future",
        "plan",
        "sun",
        "moon",
        "star",
        "sky",
        "rain",
        "cloud",
        "tree",
        "flower",
        "river",
        "mountain",
        "fire",
        "wind",
        "ocean",
        "earth",
        "stone",
        "sand",
        "leaf",
        "forest",
        "animal",
        "bird",
        "dog",
        "cat",
        "fish",
        "plant",
        "fruit",
        "apple",
        "banana",
        "mango",
        "orange",
        "grape",
        "festival",
        "travel",
        "journey",
        "work",
        "play",
        "study",
        "fight",
        "help",
        "build",
        "break",
        "dance",
        "sing",
        "run",
        "walk",
        "sleep",
        "eat",
        "drink",
        "cook",
        "write",
        "read",
        "talk",
        "listen",
        "watch",
        "draw",
        "paint",
        "buy",
        "sell",
        "drive",
        "fly",
        "swim",
        "internet",
        "computer",
        "keyboard",
        "mouse",
        "screen",
        "mobile",
        "charger",
        "battery",
        "network",
        "email",
        "software",
        "hardware",
        "data",
        "code",
        "program",
        "robot",
        "ai",
        "cloud",
        "server",
        "website",
        "camera",
        "video",
        "photo",
        "game",
        "app",
        "file",
        "document",
        "password",
        "wifi",
        "printer",
        "school",
        "college",
        "office",
        "market",
        "shop",
        "restaurant",
        "park",
        "garden",
        "library",
        "bank",
        "hospital",
        "airport",
        "station",
        "village",
        "city",
        "country",
        "road",
        "bridge",
        "hotel",
        "temple",
        "church",
        "mosque",
        "beach",
        "desert",
        "island",
        "farm",
        "factory",
        "theater",
        "museum",
        "zoo",
        "pride",
        "jealousy",
        "guilt",
        "shame",
        "anxiety",
        "excitement",
        "calm",
        "curiosity",
        "boredom",
        "surprise",
        "envy",
        "forgiveness",
        "gratitude",
        "sympathy",
        "confidence",
        "doubt",
        "hopeful",
        "nervous",
        "brave",
        "shy",
        "tired",
        "energetic",
        "lazy",
        "stressed",
        "relaxed",
        "worried",
        "cheerful",
        "lonely",
        "friendly",
        "ball",
        "bat",
        "toy",
        "shirt",
        "pants",
        "ring",
        "necklace",
        "hat",
        "glasses",
        "umbrella",
        "bag",
        "shampoo",
        "soap",
        "towel",
        "plate",
        "spoon",
        "fork",
        "knife",
        "cupboard",
        "shelf",
        "fan",
        "air",
        "heater",
        "fridge",
        "microwave",
        "stove",
        "bucket",
        "basket",
        "rope",
        "stick",
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
