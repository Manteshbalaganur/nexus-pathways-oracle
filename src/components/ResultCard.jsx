
import React from 'react';
import { ArrowRight, BriefcaseBusiness, TrendingUp, DollarSign, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ResultCard = ({ prediction, onReset }) => {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Career Prediction Results</h1>
        <p className="text-neural-gray text-lg">
          Based on your profile, here are your most compatible career paths
        </p>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="mr-2 text-neural-purple" size={20} />
          Recommended Career Paths
        </h2>
        
        <div className="space-y-4">
          {prediction.careers.map((career, index) => (
            <Card key={index} className="glass-card overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{career.title}</h3>
                    <p className="text-neural-gray mt-1">{career.description}</p>
                  </div>
                  <div className="flex items-center justify-center bg-neural-gradient rounded-full w-14 h-14 text-white font-bold text-lg">
                    {career.match}%
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center">
                    <DollarSign size={18} className="text-neural-purple mr-2" />
                    <div>
                      <p className="text-sm text-neural-gray">Salary Range</p>
                      <p className="font-medium">{career.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp size={18} className="text-neural-purple mr-2" />
                    <div>
                      <p className="text-sm text-neural-gray">Growth Rate</p>
                      <p className="font-medium">{career.growth}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BriefcaseBusiness className="mr-2 text-neural-purple" size={20} />
          Skills Assessment
        </h2>
        
        <div className="grid grid-cols-2 gap-6">
          {prediction.skills.map((skill, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{skill.name}</span>
                <span className="text-neural-purple font-semibold">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-neural-dark rounded-full overflow-hidden">
                <div 
                  className="h-full bg-neural-gradient rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 p-6 glass-card rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
        <p className="text-neural-gray">{prediction.recommendation}</p>
      </div>
      
      <div className="mt-10 flex justify-center">
        <Button
          onClick={onReset}
          className="flex items-center gap-2 bg-neural-gradient hover:opacity-90 transition-opacity"
        >
          Start New Assessment <ArrowRight size={16} />
        </Button>
      </div>
      
      <footer className="text-center pt-8 pb-4 text-neural-gray text-sm">
        © Neural Nexus - Career Prediction System
      </footer>
    </div>
  );
};

export default ResultCard;
