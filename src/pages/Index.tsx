
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { mentalBenefits } from "@/lib/data";
import { ArrowRight, Brain, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className="space-y-12 pb-20 animate-fade-in">
        <section className="text-center max-w-3xl mx-auto pt-8 lg:pt-16 pb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-teal/20 text-navy text-sm font-medium mb-4">
            Science-Driven Focus
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight">
            Enhance Your Mental State With Proven Frequencies
          </h1>
          <p className="mt-4 text-lg text-darkGray max-w-2xl mx-auto">
            Select mental benefits from scientifically validated binaural beats designed to improve focus, creativity, relaxation, and more.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate("/category/focus")}
              className="px-6 py-3 rounded-lg bg-navy text-white font-medium hover:bg-navy/90 transition-colors shadow-md"
            >
              Get Started
            </button>
            <button 
              onClick={() => navigate("/profile")}
              className="px-6 py-3 rounded-lg bg-white text-navy font-medium border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              View Profile
            </button>
          </div>
        </section>
        
        <section className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-navy text-center mb-8">Popular Mental Benefits</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mentalBenefits.slice(0, 6).map((benefit) => (
              <div 
                key={benefit.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
                onClick={() => navigate(`/category/${benefit.id}`)}
              >
                <div className="mb-4 inline-flex items-center justify-center p-3 rounded-full bg-navy/5">
                  <benefit.icon size={24} className="text-navy" />
                </div>
                
                <h3 className="text-lg font-semibold text-navy">{benefit.name}</h3>
                <p className="mt-2 text-sm text-darkGray">{benefit.description}</p>
                
                <div className="mt-4 flex justify-end">
                  <span className="inline-flex items-center text-sm font-medium text-teal hover:text-teal/80">
                    Explore <ArrowRight size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <span className="inline-block px-3 py-1 rounded-full bg-softGray text-navy text-sm font-medium mb-4">
                Research-Backed
              </span>
              <h2 className="text-2xl font-bold text-navy">The Science Behind Frequency Benefits</h2>
              <p className="mt-3 text-darkGray">
                Our binaural frequencies are based on decades of research in neuroscience. Different frequency ranges can help induce specific brainwave states associated with focus, relaxation, and creativity.
              </p>
              
              <div className="mt-6 space-y-3">
                <FactItem 
                  icon={<Brain size={20} className="text-teal" />}
                  text="Beta waves (13-30Hz) enhance concentration and alertness"
                />
                <FactItem 
                  icon={<Zap size={20} className="text-teal" />}
                  text="Gamma waves (30-100Hz) associated with peak performance"
                />
              </div>
            </div>
            
            <div className="md:w-1/2 rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Brain waves visualization" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

interface FactItemProps {
  icon: React.ReactNode;
  text: string;
}

const FactItem = ({ icon, text }: FactItemProps) => (
  <div className="flex items-start">
    <div className="mr-3">{icon}</div>
    <p className="text-sm text-darkGray">{text}</p>
  </div>
);

export default Index;
