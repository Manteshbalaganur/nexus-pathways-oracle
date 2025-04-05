
// Mock API for career prediction
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const predictCareer = async (formData) => {
  // Simulate API call delay
  await delay(1500);
  
  // Mock data based on form inputs
  return {
    careers: [
      {
        title: "Data Scientist",
        description: "Analyze and interpret complex data to help organizations make better decisions",
        match: 92,
        salary: "$90,000 - $150,000",
        growth: "Excellent (16% annually)"
      },
      {
        title: "UX/UI Designer",
        description: "Create user-friendly interfaces and optimize user experiences for digital products",
        match: 84,
        salary: "$75,000 - $120,000",
        growth: "Good (8% annually)"
      },
      {
        title: "Product Manager",
        description: "Lead the development of products from conception to launch",
        match: 78,
        salary: "$85,000 - $140,000",
        growth: "Very Good (10% annually)"
      }
    ],
    skills: [
      { name: "Technical Aptitude", level: 85 },
      { name: "Problem Solving", level: 90 },
      { name: "Communication", level: 75 },
      { name: "Creativity", level: 80 },
      { name: "Leadership", level: 70 },
      { name: "Adaptability", level: 85 }
    ],
    recommendation: "Based on your profile, you show strong potential for data-driven and analytical roles. Consider further developing your technical skills with specialized courses in data analysis, machine learning, or advanced statistics to maximize your career opportunities in these high-growth fields."
  };
};
