import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const TimerDisplay = () => {
  const [duration, setDuration] = useState(2); // duration in minutes
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasNotified = useRef(false);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (!hasNotified.current) {
              toast.success("Time's Up! 🎉");
              hasNotified.current = true;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
    hasNotified.current = false;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleDurationChange = (value: string) => {
    const newDuration = parseInt(value) || 1;
    if (newDuration > 0 && newDuration <= 60) {
      setDuration(newDuration);
      if (!isRunning) {
        setTimeLeft(newDuration * 60);
      }
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / (duration * 60)) * 100;

  return (
    <Card className="p-8 h-full flex flex-col items-center justify-center space-y-8 shadow-lg">
      {/* Duration Input */}
      <div className="w-full max-w-xs space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Timer Duration (minutes)
        </label>
        <Input
          type="number"
          min="1"
          max="60"
          value={duration}
          onChange={(e) => handleDurationChange(e.target.value)}
          disabled={isRunning}
          className="text-center text-lg"
        />
      </div>

      <div className="relative w-64 h-64">
        {/* Circular Progress */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="112"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="112"
            stroke="hsl(var(--primary))"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 112}`}
            strokeDashoffset={`${2 * Math.PI * 112 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        
        {/* Time Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-foreground tabular-nums">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {timeLeft === 0 ? "Complete!" : "remaining"}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <Button
          onClick={toggleTimer}
          size="lg"
          className="w-32"
        >
          {isRunning ? (
            <>
              <Pause className="mr-2 h-5 w-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Start
            </>
          )}
        </Button>
        
        <Button
          onClick={resetTimer}
          variant="outline"
          size="lg"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
};
