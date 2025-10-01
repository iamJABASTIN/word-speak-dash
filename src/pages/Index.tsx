import { WordDisplay } from "@/components/WordDisplay";
import { TimerDisplay } from "@/components/TimerDisplay";
import { VoiceTranscription } from "@/components/VoiceTranscription";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2 py-8">
          <h1 className="text-4xl font-bold text-foreground">
            Random Word Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Practice your communication skills • Generate a word and speak about it for 2 minutes
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <WordDisplay />
          <TimerDisplay />
        </div>

        {/* Voice Transcription Section */}
        <VoiceTranscription />
      </div>
    </div>
  );
};

export default Index;
