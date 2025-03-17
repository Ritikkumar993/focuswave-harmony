
import { useState } from "react";
import { SubCategory } from "@/lib/data";
import SessionCard from "./SessionCard";
import TimerScreen from "./TimerScreen";
import { Star, Users, Tag } from "lucide-react";

interface SubCategoryScreenProps {
  subCategory: SubCategory;
}

const SubCategoryScreen = ({ subCategory }: SubCategoryScreenProps) => {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [showTimer, setShowTimer] = useState(false);
  
  const selectedSession = subCategory.sessions.find(s => s.id === selectedSessionId);

  const handleSessionClick = (sessionId: string) => {
    setSelectedSessionId(sessionId);
  };

  const handleStartSession = () => {
    if (selectedSessionId) {
      setShowTimer(true);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-2xl font-bold text-navy">{subCategory.name}</h2>
        <p className="text-darkGray mt-1">{subCategory.description}</p>
        
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex items-center text-sm">
            <Star size={16} className="text-yellow-500 mr-1" />
            <span className="font-medium">{subCategory.rating}</span>
            <span className="text-darkGray ml-1">({subCategory.reviewCount})</span>
          </div>
          
          <div className="flex items-center text-sm text-darkGray">
            <Users size={16} className="mr-1" />
            <span>{(subCategory.reviewCount * 1.8).toFixed(0)}+ users</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {subCategory.tags.map((tag, i) => (
            <span 
              key={i} 
              className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-softGray text-navy"
            >
              <Tag size={12} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-navy mb-2">Science Behind This</h3>
        <p className="text-darkGray text-sm">{subCategory.scientificBacking}</p>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-navy mb-4">Available Sessions</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
          {subCategory.sessions.map((session) => (
            <SessionCard 
              key={session.id} 
              session={session} 
              isSelected={selectedSessionId === session.id}
              onSelect={() => handleSessionClick(session.id)}
            />
          ))}
        </div>
      </div>
      
      {selectedSessionId && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleStartSession}
            className="px-8 py-3 rounded-lg bg-teal text-navy font-medium hover:bg-teal/90 transition-colors shadow-md text-center"
          >
            Start Session
          </button>
        </div>
      )}
      
      {showTimer && selectedSession && (
        <TimerScreen 
          duration={selectedSession.duration} 
          onClose={() => setShowTimer(false)} 
          sessionName={selectedSession.name}
        />
      )}
    </div>
  );
};

export default SubCategoryScreen;
