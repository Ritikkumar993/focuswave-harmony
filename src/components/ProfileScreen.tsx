
import { userStats } from "@/lib/data";
import { Heart, Play, Clock, Flame, Music, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const ProfileScreen = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* User Welcome Section */}
      <div className="glass-panel rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-navy mb-2">
          {user ? `Welcome, ${user.email?.split('@')[0] || 'User'}` : 'Welcome to NeuroPeak'}
        </h2>
        <p className="text-darkGray mb-6">
          {user 
            ? 'Track your progress and manage your favorite sessions here.' 
            : 'Sign in to track your progress and save your favorite sessions.'}
        </p>
        
        <h2 className="text-2xl font-bold text-navy mb-6">Your Stats</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard 
            icon={<Flame size={22} className="text-orange-500" />}
            title="Day Streak"
            value={userStats.streak}
            label="consecutive days"
          />
          
          <StatCard 
            icon={<Clock size={22} className="text-teal" />}
            title="Mindful Minutes"
            value={userStats.minutesListened}
            label="total minutes"
          />
          
          <StatCard 
            icon={<Music size={22} className="text-purple-500" />}
            title="Sessions Completed"
            value={Math.floor(userStats.minutesListened / 25)}
            label="total sessions"
          />
        </div>
        
        <div className="mt-8">
          <h3 className="font-semibold text-navy mb-3">Top Categories</h3>
          <div className="space-y-3">
            {userStats.topCategories.map((category, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{category.name}</span>
                  <span className="text-darkGray">{category.minutes} min</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill"
                    style={{ 
                      width: `${(category.minutes / userStats.topCategories[0].minutes) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Favorites Section */}
      <div className="glass-panel rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-navy">Your Favorites</h2>
          <span className="text-sm text-darkGray">{userStats.favorites.length} saved</span>
        </div>
        
        <div className="space-y-4">
          {userStats.favorites.map((favorite) => (
            <div 
              key={favorite.id} 
              className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-all duration-200 hover-lift"
            >
              <div className="flex justify-between">
                <div>
                  <div className="text-xs font-medium text-teal mb-1">
                    {favorite.categoryName} &gt; {favorite.subCategoryName}
                  </div>
                  <h3 className="font-semibold text-navy">{favorite.sessionName}</h3>
                  <p className="text-sm text-darkGray mt-1">{favorite.description}</p>
                </div>
                
                <div className="flex flex-col items-center justify-between ml-4">
                  <button className="text-red-500">
                    <Heart size={18} className="fill-red-500" />
                  </button>
                  
                  <div className="flex items-center text-xs text-darkGray mt-2">
                    <Clock size={14} className="mr-1" />
                    <span>{favorite.duration} min</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex justify-end">
                <button
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-softGray text-navy text-xs font-medium hover:bg-softGray/80 transition-colors"
                >
                  <Play size={14} className="mr-1" />
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Premium Benefits Section */}
      <div className="glass-panel rounded-xl p-6 shadow-md text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-navy/5 mb-4">
          <Award size={24} className="text-navy" />
        </div>
        <h3 className="text-lg font-semibold text-navy">Premium Benefits</h3>
        <p className="text-darkGray text-sm mt-2 max-w-md mx-auto">
          Unlock unlimited sessions, download for offline use, and get personalized recommendations with NeuroPeak Premium.
        </p>
        <button className="mt-4 px-6 py-2 rounded-lg bg-navy text-white font-medium hover:bg-navy/90 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  label: string;
}

const StatCard = ({ icon, title, value, label }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-start">
        <div className="p-2 rounded-md bg-softGray mr-3">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-navy">{title}</h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-navy">{value}</span>
            <span className="ml-1 text-xs text-darkGray">{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
