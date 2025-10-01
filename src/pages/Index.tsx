import { WordDisplay } from "@/components/WordDisplay";
import { TimerDisplay } from "@/components/TimerDisplay";
import { VoiceTranscription } from "@/components/VoiceTranscription";
import { TongueTwister } from "@/components/TongueTwister";
import DotGrid from "../components/DotGrid";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {" "}
      {/* Relative container for absolute DotGrid; no bg here to allow grid visibility */}
      <DotGrid
        className="p-0" // Override default padding for full coverage
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          height: "100%",
          width: "100%", // Full sizing to fill the viewport
        }}
        dotSize={25}
        gap={64}
        baseColor="#ffffff"
        activeColor="#40d7c3"
        proximity={290}
        shockRadius={280}
        shockStrength={5}
        resistance={650}
        returnDuration={1.5}
      />
      <div className="relative z-10 min-h-screen p-6">
        {" "}
        {/* Semi-transparent background (95% opacity) to let grid subtly show through; adjust opacity as needed */}
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <header className="text-center space-y-2 py-8">
            <h1 className="text-4xl font-bold text-foreground">
              Random Word Generator
            </h1>
            <p className="text-muted-foreground text-lg">
              Enhance your creative flow. Start with a single word and build a
              coherent story around it.
            </p>
          </header>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <WordDisplay />
            <TimerDisplay />
          </div>

          {/* Tongue Twister Section */}
          <div className="mt-6">
            <TongueTwister />
          </div>

          {/* Voice Transcription Section */}
          <VoiceTranscription />
        </div>
      </div>
    </div>
  );
};

export default Index;
