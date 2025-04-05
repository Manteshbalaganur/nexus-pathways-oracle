
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import FormStep from './FormStep';
import ProgressBar from './ProgressBar';
import ResultCard from './ResultCard';
import { toast } from '@/components/ui/use-toast';
import { predictCareer } from '@/lib/mockApi';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const CareerForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prediction, setPrediction] = useState(null);
  
  const [formData, setFormData] = useState({
    age: null,
    gender: "",
    education: "",
    subjects: [],
    experience: "",
    workEnvironment: "",
    socialSkills: "",
    techSkills: "",
    motivation: "",
  });
  
  const [validation, setValidation] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
    step9: false,
  });
  
  const totalSteps = 9;

  useEffect(() => {
    // Validate Step 1
    setValidation(prev => ({
      ...prev,
      step1: formData.age !== null && formData.age >= 16 && formData.age <= 100
    }));
    
    // Validate Step 2
    setValidation(prev => ({
      ...prev,
      step2: formData.gender !== ""
    }));
    
    // Validate Step 3
    setValidation(prev => ({
      ...prev,
      step3: formData.education !== ""
    }));
    
    // Validate Step 4
    setValidation(prev => ({
      ...prev,
      step4: formData.subjects.length > 0
    }));
    
    // Validate Step 5
    setValidation(prev => ({
      ...prev,
      step5: formData.experience.trim().length > 0
    }));
    
    // Validate Step 6
    setValidation(prev => ({
      ...prev,
      step6: formData.workEnvironment !== ""
    }));
    
    // Validate Step 7
    setValidation(prev => ({
      ...prev,
      step7: formData.socialSkills !== ""
    }));
    
    // Validate Step 8
    setValidation(prev => ({
      ...prev,
      step8: formData.techSkills !== ""
    }));
    
    // Validate Step 9
    setValidation(prev => ({
      ...prev,
      step9: formData.motivation.trim().length > 0
    }));
  }, [formData]);

  const handleNext = () => {
    const validationKey = `step${currentStep}`;
    
    if (!validation[validationKey]) {
      toast({
        title: "Please complete this step",
        description: "This field is required to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validation.step9) {
      toast({
        title: "Please complete this step",
        description: "This field is required to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await predictCareer(formData);
      setPrediction(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setPrediction(null);
    setFormData({
      age: null,
      gender: "",
      education: "",
      subjects: [],
      experience: "",
      workEnvironment: "",
      socialSkills: "",
      techSkills: "",
      motivation: "",
    });
  };

  // Popular subjects for the checkboxes
  const popularSubjects = [
    "Computer Science",
    "Mathematics",
    "Engineering",
    "Business",
    "Economics",
    "Design",
    "Art",
    "Psychology",
    "Biology",
    "Physics",
    "Chemistry",
    "Literature",
    "History",
    "Philosophy",
    "Medicine",
    "Law"
  ];

  const handleSubjectToggle = (subject) => {
    setFormData(prev => {
      if (prev.subjects.includes(subject)) {
        return { ...prev, subjects: prev.subjects.filter(s => s !== subject) };
      } else {
        return { ...prev, subjects: [...prev.subjects, subject] };
      }
    });
  };

  if (prediction) {
    return <ResultCard prediction={prediction} onReset={handleReset} />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="p-6 sm:p-8 glass-card rounded-xl">
        {/* Step 1: Age */}
        <FormStep 
          title="Step 1 of 9" 
          question="How old are you?"
          isActive={currentStep === 1}
        >
          <Input
            type="number"
            placeholder="Enter your age"
            min={16}
            max={100}
            value={formData.age || ""}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || null })}
            className="bg-neural-dark/50 border-white/10 focus:border-neural-purple"
          />
        </FormStep>
        
        {/* Step 2: Gender */}
        <FormStep 
          title="Step 2 of 9" 
          question="What is your gender?"
          isActive={currentStep === 2}
        >
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non-binary" id="non-binary" />
              <Label htmlFor="non-binary">Non-binary</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
              <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </FormStep>
        
        {/* Step 3: Education Level */}
        <FormStep 
          title="Step 3 of 9" 
          question="What is your highest education level?"
          isActive={currentStep === 3}
        >
          <Select
            value={formData.education}
            onValueChange={(value) => setFormData({ ...formData, education: value })}
          >
            <SelectTrigger className="bg-neural-dark/50 border-white/10 focus:border-neural-purple">
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent className="bg-neural-card border-white/10">
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="associate">Associate Degree</SelectItem>
              <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
              <SelectItem value="masters">Master's Degree</SelectItem>
              <SelectItem value="phd">PhD or Doctorate</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormStep>
        
        {/* Step 4: Preferred Subjects */}
        <FormStep 
          title="Step 4 of 9" 
          question="What subjects interest you the most?"
          isActive={currentStep === 4}
        >
          <div className="grid grid-cols-2 gap-3">
            {popularSubjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox 
                  id={subject} 
                  checked={formData.subjects.includes(subject)}
                  onCheckedChange={() => handleSubjectToggle(subject)}
                  className="data-[state=checked]:bg-neural-purple data-[state=checked]:border-neural-purple"
                />
                <label 
                  htmlFor={subject} 
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {subject}
                </label>
              </div>
            ))}
          </div>
          {formData.subjects.length > 0 && (
            <p className="text-xs text-neural-gray mt-3">
              Selected: {formData.subjects.join(", ")}
            </p>
          )}
        </FormStep>
        
        {/* Step 5: Previous Experience */}
        <FormStep 
          title="Step 5 of 9" 
          question="Briefly describe your previous work experience (if any)."
          isActive={currentStep === 5}
        >
          <Textarea
            placeholder="Describe your experience here..."
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="bg-neural-dark/50 border-white/10 focus:border-neural-purple min-h-[150px] resize-none"
          />
        </FormStep>
        
        {/* Step 6: Work Environment */}
        <FormStep 
          title="Step 6 of 9" 
          question="What is your preferred work environment?"
          isActive={currentStep === 6}
        >
          <Select
            value={formData.workEnvironment}
            onValueChange={(value) => setFormData({ ...formData, workEnvironment: value })}
          >
            <SelectTrigger className="bg-neural-dark/50 border-white/10 focus:border-neural-purple">
              <SelectValue placeholder="Select work environment" />
            </SelectTrigger>
            <SelectContent className="bg-neural-card border-white/10">
              <SelectItem value="office">Office-based</SelectItem>
              <SelectItem value="remote">Fully Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="field-work">Field Work</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </FormStep>
        
        {/* Step 7: Social Skills */}
        <FormStep 
          title="Step 7 of 9" 
          question="How would you rate your networking and social skills?"
          isActive={currentStep === 7}
        >
          <RadioGroup
            value={formData.socialSkills}
            onValueChange={(value) => setFormData({ ...formData, socialSkills: value })}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="social-beginner" />
              <Label htmlFor="social-beginner">Beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="social-intermediate" />
              <Label htmlFor="social-intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="social-advanced" />
              <Label htmlFor="social-advanced">Advanced</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expert" id="social-expert" />
              <Label htmlFor="social-expert">Expert</Label>
            </div>
          </RadioGroup>
        </FormStep>
        
        {/* Step 8: Tech Skills */}
        <FormStep 
          title="Step 8 of 9" 
          question="How would you rate your technical and computer skills?"
          isActive={currentStep === 8}
        >
          <RadioGroup
            value={formData.techSkills}
            onValueChange={(value) => setFormData({ ...formData, techSkills: value })}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="tech-beginner" />
              <Label htmlFor="tech-beginner">Beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="tech-intermediate" />
              <Label htmlFor="tech-intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="tech-advanced" />
              <Label htmlFor="tech-advanced">Advanced</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expert" id="tech-expert" />
              <Label htmlFor="tech-expert">Expert</Label>
            </div>
          </RadioGroup>
        </FormStep>
        
        {/* Step 9: Motivation */}
        <FormStep 
          title="Step 9 of 9" 
          question="What motivates you in choosing a career path?"
          isActive={currentStep === 9}
        >
          <Textarea
            placeholder="Share what drives you in your career choices..."
            value={formData.motivation}
            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            className="bg-neural-dark/50 border-white/10 focus:border-neural-purple min-h-[150px] resize-none"
          />
        </FormStep>
        
        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between">
          {currentStep > 1 ? (
            <Button 
              onClick={handlePrevious}
              variant="outline" 
              className="flex items-center gap-2 border-white/10 hover:bg-neural-card/80"
            >
              <ArrowLeft size={16} /> Previous
            </Button>
          ) : (
            <div></div>
          )}
          
          {currentStep < totalSteps ? (
            <Button 
              onClick={handleNext}
              className="flex items-center gap-2 bg-neural-gradient hover:opacity-90 transition-opacity"
            >
              Next <ArrowRight size={16} />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-neural-gradient hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Processing
                </>
              ) : (
                <>
                  Submit <Check size={16} />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerForm;
