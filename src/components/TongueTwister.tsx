import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shuffle } from "lucide-react";

const TONGUE_TWISTERS = [
  "She sells seashells by the seashore",
  "Peter Piper picked a peck of pickled peppers",
  "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
  "Betty Botter bought some butter",
  "Red lorry, yellow lorry",
  "Unique New York",
  "Six slick slim sycamore saplings",
  "Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair",
  "I scream, you scream, we all scream for ice cream",
  "Around the rugged rocks the ragged rascal ran",
  "Three free throws",
  "Truly rural",
  "Fresh fried fish",
  "She sees cheese",
  "Toy boat",
  "Which wristwatches are Swiss wristwatches?",
  "Six thick thistle sticks",
  "Two toads totally tired",
  "A really leery Larry rolls readily to the road",
  "Good blood, bad blood",
  "I scream, you scream, we all scream for ice cream",
  "A proper copper coffee pot.",
  "The sixth sick sheik's sixth sheep's sick.",
  "I saw Susie sitting in a shoe shine shop.",
  "Lesser leather never weathered wetter weather better.",
  "Fred fed Ted bread, and Ted fed Fred bread.",
  "A big black bug bit a big black dog on his big black nose!",
  "I wish to wish the wish you wish to wish.",
  "Pad kid poured curd pulled cod.",
  "Denise sees the fleece, Denise sees the fleas. At least Denise could sneeze and feed and freeze the fleas.",
  "Can you can a can as a canner can can a can?",
  "I thought a thought, but the thought I thought wasn't the thought I thought I thought.",
  "If a dog chews shoes, whose shoes does he choose?",
  "The thirty-three thieves thought that they thrilled the throne throughout Thursday.",
  "Selfish shellfish.",
  "Imagine an imaginary menagerie manager managing an imaginary menagerie.",
  "A skunk sat on a stump and thunk the stump stunk, but the stump thunk the skunk stunk.",
  "Green glass globes glow greenly.",
  "Wayne went to Wales to watch walruses.",
  "I slit the sheet, the sheet I slit, and on the slitted sheet I sit.",
  "Eleven benevolent elephants.",
  "How can a clam cram in a clean cream can?",
  "Stupid superstition.",
  "Black back bat.",
  "Flash message.",
  "Rolling red wagons.",
  "Eddie edited it.",
  "A noisy noise annoys an oyster.",
  "Irish wristwatch.",
  "He threw three balls.",
  "Thin sticks, thick bricks.",
  "Scissors sizzle, thistles sizzle.",
  "The great Greek grape growers grow great Greek grapes."
];

export const TongueTwister = () => {
  const [twister, setTwister] = useState("");

  const getRandomTwister = () => {
    const randomIndex = Math.floor(Math.random() * TONGUE_TWISTERS.length);
    setTwister(TONGUE_TWISTERS[randomIndex]);
  };

  useEffect(() => {
    getRandomTwister();
  }, []);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Tongue Twister</h2>
          <Button onClick={getRandomTwister} variant="outline" className="gap-2">
            <Shuffle className="w-4 h-4" />
            New Twister
          </Button>
        </div>
        <div className="bg-muted p-6 rounded-lg">
          <p className="text-xl font-medium text-center">{twister}</p>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Practice this tongue twister to improve your articulation and pronunciation
        </p>
      </div>
    </Card>
  );
};