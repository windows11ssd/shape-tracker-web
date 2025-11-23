import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { BMICalculator } from '@/components/BMICalculator';
import { Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Health
            </span>
          </div>
          <div className="flex gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
        
        <BMICalculator />
      </div>
    </div>
  );
};

export default Index;
