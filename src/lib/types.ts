
export type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say";

export type EducationLevel = 
  | "high-school" 
  | "associate" 
  | "bachelors" 
  | "masters" 
  | "phd" 
  | "other";

export type WorkEnvironment = 
  | "office" 
  | "remote" 
  | "hybrid" 
  | "field-work" 
  | "flexible";

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface FormData {
  age: number | null;
  gender: Gender | "";
  education: EducationLevel | "";
  subjects: string[];
  experience: string;
  workEnvironment: WorkEnvironment | "";
  socialSkills: SkillLevel | "";
  techSkills: SkillLevel | "";
  motivation: string;
}

export interface FormStep {
  id: string;
  title: string;
  question: string;
  component: React.ReactNode;
}

export interface CareerPrediction {
  careers: {
    title: string;
    match: number;
    description: string;
    salary: string;
    growth: string;
  }[];
  skills: {
    name: string;
    level: number;
  }[];
  recommendation: string;
}

export interface FormValidation {
  [key: string]: boolean;
}
