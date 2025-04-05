
import { FormData, CareerPrediction } from "./types";

export const predictCareer = async (data: FormData): Promise<CareerPrediction> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be a real API call in production
      // const response = await fetch('/api/predict', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // const result = await response.json();
      
      // For now, return mock data based on input
      const techBased = data.subjects.some(
        s => ["computer science", "programming", "technology", "IT", "engineering"].includes(s.toLowerCase())
      );
      
      const artBased = data.subjects.some(
        s => ["design", "art", "music", "creative writing", "film"].includes(s.toLowerCase())
      );
      
      const businessBased = data.subjects.some(
        s => ["business", "finance", "economics", "marketing", "management"].includes(s.toLowerCase())
      );
      
      let careers = [];
      
      if (techBased) {
        careers.push({
          title: "Software Developer",
          match: 94,
          description: "Design, build and maintain software systems and applications.",
          salary: "$110,000 - $150,000",
          growth: "22% (Much faster than average)"
        });
        careers.push({
          title: "Data Scientist",
          match: 87,
          description: "Extract insights from complex data using statistics and machine learning.",
          salary: "$95,000 - $140,000",
          growth: "36% (Much faster than average)"
        });
      }
      
      if (artBased) {
        careers.push({
          title: "UX/UI Designer",
          match: 91,
          description: "Create engaging, effective user experiences for digital products.",
          salary: "$85,000 - $120,000",
          growth: "13% (Faster than average)"
        });
        careers.push({
          title: "Creative Director",
          match: 82,
          description: "Lead creative teams and shape the visual identity of brands.",
          salary: "$95,000 - $150,000",
          growth: "11% (Faster than average)"
        });
      }
      
      if (businessBased) {
        careers.push({
          title: "Financial Analyst",
          match: 88,
          description: "Analyze financial data to guide business decisions and investments.",
          salary: "$85,000 - $125,000",
          growth: "9% (Average)"
        });
        careers.push({
          title: "Marketing Manager",
          match: 86,
          description: "Develop and implement marketing strategies to promote products or services.",
          salary: "$90,000 - $140,000",
          growth: "10% (Average)"
        });
      }
      
      // Default career options if none of the above
      if (careers.length === 0) {
        careers = [
          {
            title: "Project Manager",
            match: 84,
            description: "Plan, execute, and close projects across various domains.",
            salary: "$75,000 - $120,000",
            growth: "8% (Average)"
          },
          {
            title: "Human Resources Specialist",
            match: 79,
            description: "Manage employee relations, recruitment, and organizational development.",
            salary: "$65,000 - $95,000",
            growth: "7% (Average)"
          },
          {
            title: "Healthcare Administrator",
            match: 82,
            description: "Manage healthcare facilities, services, or departments.",
            salary: "$70,000 - $110,000",
            growth: "28% (Much faster than average)"
          }
        ];
      }
      
      // Sort by match score
      careers.sort((a, b) => b.match - a.match);
      
      // Limit to top 3
      careers = careers.slice(0, 3);
      
      // Skills assessment
      const skills = [
        {
          name: "Communication",
          level: data.socialSkills === "expert" ? 90 : 
                 data.socialSkills === "advanced" ? 75 :
                 data.socialSkills === "intermediate" ? 60 : 45
        },
        {
          name: "Technical",
          level: data.techSkills === "expert" ? 90 : 
                 data.techSkills === "advanced" ? 75 :
                 data.techSkills === "intermediate" ? 60 : 45
        },
        {
          name: "Adaptability",
          level: data.workEnvironment === "flexible" ? 85 : 70
        },
        {
          name: "Leadership",
          level: Math.min(data.experience?.length * 5 || 0, 80)
        }
      ];
      
      const recommendation = 
        data.age && data.age < 25 ? 
          "Consider internships or entry-level positions in your field of interest to build experience." :
        data.education === "bachelors" || data.education === "masters" || data.education === "phd" ?
          "Your academic background aligns well with your career interests. Continue developing specialized skills." :
          "Consider additional certification or education to enhance your qualifications in these career paths.";
      
      resolve({
        careers,
        skills,
        recommendation
      });
    }, 1500); // Simulate API delay
  });
};
