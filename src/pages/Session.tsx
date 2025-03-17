
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mentalBenefits, Session as SessionType } from "@/lib/data";
import TimerScreen from "@/components/TimerScreen";

const Session = () => {
  const { categoryId, sessionId } = useParams<{ categoryId: string, sessionId: string }>();
  const [session, setSession] = useState<SessionType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId && sessionId) {
      const category = mentalBenefits.find(b => b.id === categoryId);
      if (category) {
        for (const sub of category.subCategories) {
          const foundSession = sub.sessions.find(s => s.id === sessionId);
          if (foundSession) {
            setSession(foundSession);
            return;
          }
        }
      }
    }
  }, [categoryId, sessionId]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lightGray">
        <p className="text-lg text-darkGray">Session not found</p>
      </div>
    );
  }

  return (
    <TimerScreen 
      duration={session.duration} 
      onClose={() => navigate(-1)} 
      sessionName={session.name} 
    />
  );
};

export default Session;
