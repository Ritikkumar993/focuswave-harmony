
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightGray">
      <div className="text-center glass-panel rounded-xl p-10 shadow-lg max-w-md animate-fade-in">
        <h1 className="text-5xl font-bold text-navy mb-4">404</h1>
        <p className="text-xl text-darkGray mb-6">Page not found</p>
        <p className="text-darkGray mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 rounded-lg bg-navy text-white font-medium hover:bg-navy/90 transition-colors"
        >
          <HomeIcon size={18} className="mr-2" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
