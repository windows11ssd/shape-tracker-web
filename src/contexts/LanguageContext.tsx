import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    title: 'حاسبة مؤشر كتلة الجسم',
    subtitle: 'احسب مؤشر كتلة جسمك واحفظ النتائج',
    name: 'الاسم',
    namePlaceholder: 'أدخل اسمك',
    height: 'الطول (سم)',
    heightPlaceholder: 'أدخل طولك بالسنتيمتر',
    weight: 'الوزن (كجم)',
    weightPlaceholder: 'أدخل وزنك بالكيلوجرام',
    calculate: 'احسب',
    calculating: 'جاري الحساب...',
    yourBMI: 'مؤشر كتلة جسمك',
    category: 'الفئة',
    underweight: 'نحيف',
    normal: 'طبيعي',
    overweight: 'وزن زائد',
    obese: 'سمنة',
    resultSaved: 'تم حفظ النتيجة بنجاح!',
    fillAllFields: 'يرجى ملء جميع الحقول',
    errorSaving: 'حدث خطأ أثناء حفظ النتيجة',
  },
  en: {
    title: 'BMI Calculator',
    subtitle: 'Calculate your Body Mass Index and save results',
    name: 'Name',
    namePlaceholder: 'Enter your name',
    height: 'Height (cm)',
    heightPlaceholder: 'Enter your height in centimeters',
    weight: 'Weight (kg)',
    weightPlaceholder: 'Enter your weight in kilograms',
    calculate: 'Calculate',
    calculating: 'Calculating...',
    yourBMI: 'Your BMI',
    category: 'Category',
    underweight: 'Underweight',
    normal: 'Normal',
    overweight: 'Overweight',
    obese: 'Obese',
    resultSaved: 'Result saved successfully!',
    fillAllFields: 'Please fill all fields',
    errorSaving: 'Error saving result',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ar';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
