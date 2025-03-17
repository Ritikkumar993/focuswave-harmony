
import { useState, useEffect } from "react";
import { X, PauseCircle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerScreenProps {
  duration: number; // In minutes
  onClose: () => void;
  sessionName: string;
}

const TimerScreen = ({ duration, onClose, sessionName }: TimerScreenProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeLeft]);

  const togglePause = () => {
    setIsPaused(!isPaused);
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
        
        <div className="flex justify-center">
          <button
            onClick={togglePause}
            className="p-4 rounded-full text-white hover:bg-white/10 transition-colors"
          >
            {isPaused ? (
              <PlayCircle size={48} className="text-teal" />
            ) : (
              <PauseCircle size={48} className="text-teal" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerScreen;
