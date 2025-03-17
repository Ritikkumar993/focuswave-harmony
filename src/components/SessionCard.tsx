
import { useState } from "react";
import { Session } from "@/lib/data";
import { Heart, Play, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

interface SessionCardProps {
  session: Session;
  isSelected?: boolean;
  onSelect?: () => void;
}

const SessionCard = ({ session, isSelected = false, onSelect }: SessionCardProps) => {
  const [isFavorite, setIsFavorite] = useState(session.isFavorite || false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    toast(
      !isFavorite ? "Added to favorites" : "Removed from favorites", 
      {
        description: session.name,
        position: "bottom-center",
      }
    );
  };

  return (
    <div 
      className={cn(
        "relative p-5 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer",
        "hover:-translate-y-1 overflow-hidden",
        isSelected && "ring-2 ring-teal shadow-md"
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-navy text-lg">{session.name}</h3>
          <p className="text-darkGray mt-1 text-sm">{session.description}</p>
          
          <div className="flex items-center text-sm text-darkGray mt-3">
            <Clock size={16} className="mr-1" />
            <span>{session.duration} min</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {session.tags.map((tag, i) => (
              <span 
                key={i} 
                className="text-xs px-2 py-1 rounded-full bg-softGray text-navy"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <button
          className={cn(
            "ml-2 p-2 rounded-full bg-softGray hover:bg-softGray/80 transition-colors",
            isFavorite && "animate-pulse-favorite"
          )}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={18} 
            className={cn(
              "transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-darkGray"
            )} 
          />
        </button>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button 
          className="inline-flex items-center px-4 py-2 rounded-lg bg-teal text-navy font-medium hover:bg-teal/90 transition-colors"
        >
          <Play size={16} className="mr-2" />
          Start Session
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
