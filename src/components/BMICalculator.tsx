import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Calculator } from 'lucide-react';
import { BMIResult } from './BMIResult';

interface BMIData {
  bmi: number;
  category: string;
}

export const BMICalculator = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<BMIData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateBMI = (heightCm: number, weightKg: number): BMIData => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    
    let category = '';
    if (bmi < 18.5) {
      category = t('underweight');
    } else if (bmi < 25) {
      category = t('normal');
    } else if (bmi < 30) {
      category = t('overweight');
    } else {
      category = t('obese');
    }

    return { bmi: parseFloat(bmi.toFixed(2)), category };
  };

  const handleCalculate = async () => {
    if (!name || !height || !weight) {
      toast.error(t('fillAllFields'));
      return;
    }

    setIsCalculating(true);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    const bmiData = calculateBMI(heightNum, weightNum);
    
    setResult(bmiData);

    try {
      const { error } = await supabase.from('bmi_records').insert({
        name,
        height: heightNum,
        weight: weightNum,
        bmi: bmiData.bmi,
        category: bmiData.category,
      });

      if (error) throw error;
      toast.success(t('resultSaved'));
    } catch (error) {
      console.error('Error saving BMI record:', error);
      toast.error(t('errorSaving'));
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-glow border-border/50 bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="h-6 w-6 text-primary" />
            {t('title')}
          </CardTitle>
          <CardDescription>{t('subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('name')}</Label>
            <Input
              id="name"
              placeholder={t('namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-border/50 focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">{t('height')}</Label>
            <Input
              id="height"
              type="number"
              placeholder={t('heightPlaceholder')}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border-border/50 focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">{t('weight')}</Label>
            <Input
              id="weight"
              type="number"
              placeholder={t('weightPlaceholder')}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border-border/50 focus:border-primary transition-colors"
            />
          </div>
          <Button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {isCalculating ? t('calculating') : t('calculate')}
          </Button>
        </CardContent>
      </Card>

      {result && <BMIResult bmi={result.bmi} category={result.category} />}
    </div>
  );
};
