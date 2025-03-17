
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const AppLayout = ({ children, fullWidth = false }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-lightGray">
      <Sidebar />
      
      <main
        className={cn(
          "pt-16 pb-20 px-4 min-h-screen",
          "lg:pl-72 lg:pt-10",
          fullWidth ? "max-w-full" : "max-w-5xl mx-auto"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
