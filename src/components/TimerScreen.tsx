
import { useState, useEffect } from "react";
import { X, PauseCircle, PlayCircle, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import binauralPlayer from "@/lib/audioPlayer";

interface TimerScreenProps {
  duration: number; // In minutes
  onClose: () => void;
  sessionName: string;
  frequency?: string; // e.g. "14Hz Beta"
  backgroundSound?: string;
}

type DurationOption = {
  value: number;
  label: string;
};

const TimerScreen = ({ 
  duration: initialDuration = 10, 
  onClose, 
  sessionName,
  frequency = "10Hz Alpha",
  backgroundSound = "White Noise" 
}: TimerScreenProps) => {
  const [duration, setDuration] = useState(initialDuration);
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Parse the frequency string to get the Hz value
  const getFrequencyValue = (freqString: string): number => {
    const match = freqString.match(/(\d+)Hz/);
    return match ? parseInt(match[1], 10) : 10; // Default to 10Hz if parsing fails
  };

  // Duration options for the settings dialog
  const durationOptions: DurationOption[] = [
    { value: 5, label: "5 minutes" },
    { value: 10, label: "10 minutes" },
    { value: 15, label: "15 minutes" },
    { value: 20, label: "20 minutes" },
    { value: 30, label: "30 minutes" },
    { value: 45, label: "45 minutes" },
    { value: 60, label: "60 minutes" },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      binauralPlayer.stop();
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeLeft]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      binauralPlayer.stop();
    };
  }, []);

  const togglePause = () => {
    if (isActive) {
      setIsPaused(!isPaused);
      if (isPaused) {
        // Resume playing
        binauralPlayer.play(getFrequencyValue(frequency), backgroundSound);
      } else {
        // Pause
        binauralPlayer.stop();
      }
    }
  };

  const startSession = () => {
    setIsActive(true);
    setIsPaused(false);
    setTimeLeft(duration * 60);
    binauralPlayer.play(getFrequencyValue(frequency), backgroundSound);
    setShowSettings(false);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    binauralPlayer.setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      // Unmute - restore previous volume
      setIsMuted(false);
      binauralPlayer.setVolume(volume > 0 ? volume : 0.2);
    } else {
      // Mute
      setIsMuted(true);
      binauralPlayer.setVolume(0);
    }
  };

  const openSettings = () => {
    if (!isActive) {
      setShowSettings(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-navy/90 backdrop-blur-lg animate-fade-in">
      <div className="absolute top-4 right-4">
        <button 
          onClick={onClose} 
          className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close timer"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="text-center px-6 py-10 max-w-lg animate-scale-in">
        <h2 className="text-white font-medium text-xl mb-2">{sessionName}</h2>
        <p className="text-teal/80 text-sm mb-6">
          {frequency} • {backgroundSound}
        </p>
        
        {!isActive ? (
          <div className="space-y-8">
            <div className="text-white text-center">
              <p className="mb-4">Select your session duration:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {durationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDuration(option.value)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm transition-colors",
                      duration === option.value 
                        ? "bg-teal text-navy font-medium" 
                        : "bg-white/10 text-white hover:bg-white/20"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={startSession}
              className="inline-flex items-center px-8 py-3 rounded-lg bg-teal text-navy font-medium hover:bg-teal/90 transition-colors"
            >
              <PlayCircle size={24} className="mr-2" />
              Start Session
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 mb-12">
              <div className="text-white text-7xl font-light mb-8">
                {formatTime(timeLeft)}
              </div>
              
              <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-teal rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-center items-center">
              <button
                onClick={toggleMute}
                className="p-3 rounded-full text-white hover:bg-white/10 transition-colors mr-4"
              >
                {isMuted ? (
                  <VolumeX size={20} className="text-white/70" />
                ) : (
                  <Volume2 size={20} className="text-white" />
                )}
              </button>
              
              <div className="w-32 mx-4">
                <Slider
                  defaultValue={[0.2]}
                  max={1}
                  step={0.01}
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
              
              <button
                onClick={togglePause}
                className="p-4 rounded-full text-white hover:bg-white/10 transition-colors ml-4"
              >
                {isPaused ? (
                  <PlayCircle size={48} className="text-teal" />
                ) : (
                  <PauseCircle size={48} className="text-teal" />
                )}
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-white rounded-lg">
          <DialogTitle>Session Settings</DialogTitle>
          <DialogDescription>
            Customize your binaural beat session
          </DialogDescription>
          
          <div className="space-y-4 py-4">
            <div>
              <h3 className="font-medium mb-2">Duration</h3>
              <RadioGroup value={String(duration)} onValueChange={(val) => setDuration(Number(val))}>
                <div className="grid grid-cols-2 gap-2">
                  {durationOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={String(option.value)} id={`duration-${option.value}`} />
                      <label htmlFor={`duration-${option.value}`}>{option.label}</label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowSettings(false)} className="mr-2">
              Cancel
            </Button>
            <Button onClick={startSession}>
              Start Session
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimerScreen;
