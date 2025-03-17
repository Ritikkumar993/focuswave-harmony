
import { Brain, Zap, Heart, Sparkles, Sun, Moon, User } from "lucide-react";

export type MentalBenefit = {
  id: string;
  name: string;
  icon: any;
  description: string;
  subCategories: SubCategory[];
};

export type SubCategory = {
  id: string;
  name: string;
  description: string;
  scientificBacking: string;
  sessions: Session[];
  reviewCount: number;
  rating: number;
  tags: string[];
};

export type Session = {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  frequency: string;
  backgroundSound?: string;
  tags: string[];
  isFavorite?: boolean;
};

export type UserStats = {
  streak: number;
  minutesListened: number;
  topCategories: { name: string; minutes: number }[];
  favorites: {
    id: string;
    categoryName: string;
    subCategoryName: string;
    sessionName: string;
    description: string;
    duration: number;
  }[];
};

export const mentalBenefits: MentalBenefit[] = [
  {
    id: "focus",
    name: "Deep Focus",
    icon: Brain,
    description: "Enhance concentration and attentiveness",
    subCategories: [
      {
        id: "laser-focus",
        name: "Laser Focus",
        description: "14Hz Beta Waves + White Noise",
        scientificBacking: "Beta waves (13-30Hz) have been shown to enhance concentration and alertness in multiple studies.",
        rating: 4.5,
        reviewCount: 523,
        tags: ["Neuroscience-Backed", "Productivity", "Concentration"],
        sessions: [
          {
            id: "focus-blast",
            name: "10-minute Focus Blast",
            description: "Quick session for immediate concentration boost",
            duration: 10,
            frequency: "14Hz Beta",
            backgroundSound: "White Noise",
            tags: ["Quick Session", "Beta Waves"],
          },
          {
            id: "pomodoro",
            name: "25-minute Pomodoro Focus",
            description: "Complete one focused work session",
            duration: 25,
            frequency: "14Hz Beta + 40Hz Gamma intervals",
            backgroundSound: "Café Ambience",
            tags: ["Pomodoro Technique", "Beta Waves", "Productivity"],
          },
          {
            id: "deep-work",
            name: "60-minute Deep Work Session",
            description: "Extended focus for complex problem solving",
            duration: 60,
            frequency: "12-15Hz Beta with 40Hz Gamma bursts",
            backgroundSound: "Minimal Piano",
            tags: ["Deep Work", "Beta Waves", "Productivity"],
          }
        ]
      },
      {
        id: "flow-state",
        name: "Flow State",
        description: "40Hz Gamma + Forest Sounds",
        scientificBacking: "Gamma waves (30-100Hz) are associated with peak performance and the 'flow state' according to EEG studies.",
        rating: 4.7,
        reviewCount: 328,
        tags: ["Neuroscience-Backed", "Productivity", "Flow"],
        sessions: [
          {
            id: "flow-inducer",
            name: "30-minute Flow Inducer",
            description: "Enter the zone for creative work",
            duration: 30,
            frequency: "40Hz Gamma",
            backgroundSound: "Forest Sounds",
            tags: ["Flow State", "Gamma Waves", "Creativity"],
          },
          {
            id: "sustained-flow",
            name: "90-minute Full Flow Cycle",
            description: "Complete creativity cycle with natural breaks",
            duration: 90,
            frequency: "40Hz Gamma with Alpha transitions",
            backgroundSound: "Gentle Rain",
            tags: ["Flow State", "Gamma Waves", "Creativity Cycle"],
          }
        ]
      }
    ]
  },
  {
    id: "energy",
    name: "Energy Boost",
    icon: Zap,
    description: "Increase alertness and mental energy",
    subCategories: [
      {
        id: "morning-boost",
        name: "Morning Energizer",
        description: "Balanced frequencies to start your day",
        scientificBacking: "Beta waves have been shown to increase alertness and reduce morning drowsiness.",
        rating: 4.3,
        reviewCount: 267,
        tags: ["Morning Routine", "Energy", "Alertness"],
        sessions: [
          {
            id: "wake-up",
            name: "15-minute Wake Up",
            description: "Gentle ramp from theta to beta waves",
            duration: 15,
            frequency: "4Hz to 20Hz progression",
            backgroundSound: "Bright Ambient",
            tags: ["Morning", "Energy", "Quick Session"],
          },
          {
            id: "full-morning",
            name: "30-minute Morning Ritual",
            description: "Complete energizing session with focus finale",
            duration: 30,
            frequency: "Theta to Beta to Gamma progression",
            backgroundSound: "Light Percussion",
            tags: ["Morning Routine", "Energy", "Focus"],
          }
        ]
      }
    ]
  },
  {
    id: "relax",
    name: "Relaxation",
    icon: Heart,
    description: "Reduce stress and anxiety",
    subCategories: [
      {
        id: "stress-relief",
        name: "Stress Melter",
        description: "Alpha waves for tension release",
        scientificBacking: "Alpha waves (8-12Hz) are associated with relaxation and stress reduction in multiple clinical trials.",
        rating: 4.8,
        reviewCount: 612,
        tags: ["Stress Relief", "Relaxation", "Well-being"],
        sessions: [
          {
            id: "quick-calm",
            name: "5-minute Calm",
            description: "Quick anxiety reduction session",
            duration: 5,
            frequency: "10Hz Alpha",
            backgroundSound: "Ocean Waves",
            tags: ["Quick Session", "Anxiety Relief", "Alpha Waves"],
          },
          {
            id: "deep-relax",
            name: "20-minute Deep Relaxation",
            description: "Full-body relaxation and mind clearing",
            duration: 20,
            frequency: "8-10Hz Alpha waves",
            backgroundSound: "Gentle Rainfall",
            tags: ["Relaxation", "Alpha Waves", "Stress Relief"],
          }
        ]
      }
    ]
  },
  {
    id: "creativity",
    name: "Creativity",
    icon: Sparkles,
    description: "Enhance creative thinking and ideation",
    subCategories: [
      {
        id: "creative-flow",
        name: "Creative Flow",
        description: "Alpha-Theta waves for creative breakthrough",
        scientificBacking: "Alpha-Theta border (7-8Hz) has been linked to creative insights and 'aha' moments in creativity research.",
        rating: 4.6,
        reviewCount: 298,
        tags: ["Creativity", "Problem Solving", "Ideation"],
        sessions: [
          {
            id: "idea-generation",
            name: "20-minute Idea Generator",
            description: "Open mind for new concepts and connections",
            duration: 20,
            frequency: "7.83Hz Schumann Resonance",
            backgroundSound: "Ambient Soundscape",
            tags: ["Ideation", "Alpha Waves", "Creativity"],
          },
          {
            id: "creative-problem",
            name: "40-minute Problem Solver",
            description: "Work through creative blocks with alternating frequencies",
            duration: 40,
            frequency: "Alpha-Theta-Gamma cycle",
            backgroundSound: "Minimal Electronica",
            tags: ["Problem Solving", "Creativity", "Neural Flexibility"],
          }
        ]
      }
    ]
  },
  {
    id: "energy-day",
    name: "Daytime Energy",
    icon: Sun,
    description: "Sustained alertness throughout the day",
    subCategories: [
      {
        id: "afternoon-slump",
        name: "Afternoon Slump Buster",
        description: "Beta and SMR waves to overcome afternoon fatigue",
        scientificBacking: "Sensorimotor rhythm (SMR, 12-15Hz) training has been shown to improve attention and reduce fatigue.",
        rating: 4.4,
        reviewCount: 183,
        tags: ["Afternoon Energy", "Productivity", "Focus"],
        sessions: [
          {
            id: "quick-refresh",
            name: "7-minute Refresher",
            description: "Quick energy reset for immediate revival",
            duration: 7,
            frequency: "15Hz Beta + SMR",
            backgroundSound: "Upbeat Instrumental",
            tags: ["Quick Session", "Energy", "Afternoon"],
          },
          {
            id: "sustained-energy",
            name: "20-minute Energy Stabilizer",
            description: "Overcome afternoon slump and regain focus",
            duration: 20,
            frequency: "13-16Hz Beta progression",
            backgroundSound: "Medium Tempo Beats",
            tags: ["Afternoon Energy", "Beta Waves", "Productivity"],
          }
        ]
      }
    ]
  },
  {
    id: "sleep",
    name: "Sleep & Rest",
    icon: Moon,
    description: "Improve sleep quality and restfulness",
    subCategories: [
      {
        id: "deep-sleep",
        name: "Deep Sleep Inducer",
        description: "Delta waves for restful sleep",
        scientificBacking: "Delta waves (0.5-4Hz) are strongly associated with deep, restorative sleep phases.",
        rating: 4.9,
        reviewCount: 742,
        tags: ["Sleep", "Relaxation", "Recovery"],
        sessions: [
          {
            id: "sleep-transition",
            name: "30-minute Sleep Transition",
            description: "Gentle descent from Alpha to Delta for natural sleep onset",
            duration: 30,
            frequency: "10Hz to 3Hz descent",
            backgroundSound: "Gentle Rain",
            tags: ["Sleep Onset", "Relaxation", "Delta Waves"],
          },
          {
            id: "deep-sleep-support",
            name: "8-hour Sleep Support",
            description: "Full night frequency support for quality sleep",
            duration: 480,
            frequency: "Delta waves with periodic theta bursts",
            backgroundSound: "Pink Noise",
            tags: ["Deep Sleep", "Delta Waves", "Full Night"],
          }
        ]
      },
      {
        id: "power-nap",
        name: "Optimal Power Nap",
        description: "20-minute nap optimization with theta waves",
        scientificBacking: "Theta waves (4-8Hz) can help achieve restful short sleep periods without entering deep sleep.",
        rating: 4.7,
        reviewCount: 319,
        tags: ["Power Nap", "Recovery", "Quick Rest"],
        sessions: [
          {
            id: "quick-nap",
            name: "10-minute Micro Nap",
            description: "Ultra-short refreshing rest without grogginess",
            duration: 10,
            frequency: "6Hz Theta",
            backgroundSound: "White Noise",
            tags: ["Micro Nap", "Theta Waves", "Quick Recovery"],
          },
          {
            id: "optimal-nap",
            name: "22-minute Perfect Nap",
            description: "Scientifically optimal nap length with wake cycle",
            duration: 22,
            frequency: "Theta waves with Beta wake-up phase",
            backgroundSound: "Ocean Waves with Bird Cues",
            tags: ["Power Nap", "Theta Waves", "Productivity"],
          }
        ]
      }
    ]
  }
];

export const userStats: UserStats = {
  streak: 7,
  minutesListened: 420,
  topCategories: [
    { name: "Deep Focus", minutes: 180 },
    { name: "Sleep & Rest", minutes: 120 },
    { name: "Relaxation", minutes: 60 },
    { name: "Creativity", minutes: 40 },
    { name: "Energy Boost", minutes: 20 }
  ],
  favorites: [
    {
      id: "fav1",
      categoryName: "Deep Focus",
      subCategoryName: "Laser Focus",
      sessionName: "60-minute Deep Work Session",
      description: "Extended focus for complex problem solving",
      duration: 60
    },
    {
      id: "fav2",
      categoryName: "Sleep & Rest",
      subCategoryName: "Deep Sleep Inducer",
      sessionName: "30-minute Sleep Transition",
      description: "Gentle descent from Alpha to Delta for natural sleep onset",
      duration: 30
    },
    {
      id: "fav3",
      categoryName: "Relaxation",
      subCategoryName: "Stress Melter",
      sessionName: "20-minute Deep Relaxation",
      description: "Full-body relaxation and mind clearing",
      duration: 20
    }
  ]
};
