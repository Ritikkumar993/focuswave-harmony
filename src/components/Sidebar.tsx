
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { mentalBenefits, MentalBenefit } from "@/lib/data";
import { User, Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={toggleSidebar}
        className="fixed lg:hidden z-50 top-4 left-4 p-2 rounded-full bg-white shadow-md text-navy"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-navy text-white z-50 transform transition-transform duration-300 ease-in-out",
          "flex flex-col",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-6 py-8">
          <h1 className="text-xl font-bold tracking-tight mb-1">NeuroPeak</h1>
          <p className="text-xs text-teal font-medium">Science-driven focus</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 py-2">
          <div className="space-y-1">
            {mentalBenefits.map((benefit) => (
              <NavItem 
                key={benefit.id} 
                benefit={benefit} 
                isActive={location.pathname.includes(`/category/${benefit.id}`)}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>
        </nav>
        
        <div className="mt-auto border-t border-white/10 p-4">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-4 py-2">
                <Avatar className="h-8 w-8 bg-white/10">
                  <AvatarFallback className="text-white">{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div className="truncate">
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
              </div>
              
              <NavLink 
                to="/profile" 
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200",
                  isActive && "bg-white/10"
                )}
                onClick={() => setIsOpen(false)}
              >
                <User size={20} className="mr-3" />
                <span>Profile</span>
              </NavLink>
              
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="flex w-full items-center px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
              >
                <LogOut size={20} className="mr-3" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <NavLink 
              to="/auth" 
              className="flex items-center px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <User size={20} className="mr-3" />
              <span>Sign In</span>
            </NavLink>
          )}
        </div>
      </aside>
    </>
  );
};

type NavItemProps = {
  benefit: MentalBenefit;
  isActive: boolean;
  onClick: () => void;
};

const NavItem = ({ benefit, isActive, onClick }: NavItemProps) => {
  const Icon = benefit.icon;
  
  return (
    <NavLink
      to={`/category/${benefit.id}`}
      className={({ isActive }) => cn(
        "flex items-center px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200",
        isActive && "bg-white/10"
      )}
      onClick={onClick}
    >
      <Icon size={20} className="mr-3" />
      <span>{benefit.name}</span>
    </NavLink>
  );
};

export default Sidebar;
