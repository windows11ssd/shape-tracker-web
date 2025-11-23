import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Activity } from 'lucide-react';

interface BMIResultProps {
  bmi: number;
  category: string;
}

export const BMIResult = ({ bmi, category }: BMIResultProps) => {
  const { t } = useLanguage();

  const getCategoryColor = () => {
    if (category === t('underweight')) return 'text-warning';
    if (category === t('normal')) return 'text-success';
    if (category === t('overweight')) return 'text-warning';
    return 'text-destructive';
  };

  const getCategoryBg = () => {
    if (category === t('underweight')) return 'bg-warning/10 border-warning/20';
    if (category === t('normal')) return 'bg-success/10 border-success/20';
    if (category === t('overweight')) return 'bg-warning/10 border-warning/20';
    return 'bg-destructive/10 border-destructive/20';
  };

  return (
    <Card className={`shadow-glow border-2 ${getCategoryBg()} animate-in fade-in-0 slide-in-from-bottom-4 duration-500`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          {t('yourBMI')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            {bmi}
          </div>
          <div className={`text-xl font-semibold ${getCategoryColor()}`}>
            {t('category')}: {category}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs text-center pt-4 border-t border-border/50">
          <div className={bmi < 18.5 ? 'font-bold text-warning' : 'text-muted-foreground'}>
            <div>&lt; 18.5</div>
            <div>{t('underweight')}</div>
          </div>
          <div className={bmi >= 18.5 && bmi < 25 ? 'font-bold text-success' : 'text-muted-foreground'}>
            <div>18.5 - 24.9</div>
            <div>{t('normal')}</div>
          </div>
          <div className={bmi >= 25 && bmi < 30 ? 'font-bold text-warning' : 'text-muted-foreground'}>
            <div>25 - 29.9</div>
            <div>{t('overweight')}</div>
          </div>
          <div className={bmi >= 30 ? 'font-bold text-destructive' : 'text-muted-foreground'}>
            <div>&ge; 30</div>
            <div>{t('obese')}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
