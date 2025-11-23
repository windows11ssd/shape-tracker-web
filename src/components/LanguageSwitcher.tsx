import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="rounded-full border-border/50 hover:border-primary transition-all"
      aria-label="Switch language"
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">Toggle language</span>
    </Button>
  );
};
