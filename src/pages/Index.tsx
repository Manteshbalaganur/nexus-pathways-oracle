
import React from 'react';
import CareerForm from '@/components/CareerForm';
import { BrainCircuit } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen py-10 px-4 bg-neural-dark">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-neural-gradient animate-pulse-glow">
              <BrainCircuit size={24} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient">Neural Nexus</h1>
          </div>
          <h2 className="text-xl md:text-2xl mb-3">Career Prediction Oracle</h2>
          <p className="text-neural-gray max-w-2xl mx-auto">
            Answer a few questions about your skills, experiences, and preferences to discover 
            the career paths that best match your unique profile.
          </p>
        </header>

        {/* Form Component */}
        <CareerForm />
      </div>
    </div>
  );
};

export default Index;
