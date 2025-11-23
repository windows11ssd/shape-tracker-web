-- Create BMI records table
CREATE TABLE public.bmi_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  height DECIMAL(5,2) NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  bmi DECIMAL(5,2) NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bmi_records ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert records (public calculator)
CREATE POLICY "Anyone can insert BMI records" 
ON public.bmi_records 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to view records (for history/stats if needed)
CREATE POLICY "Anyone can view BMI records" 
ON public.bmi_records 
FOR SELECT 
USING (true);

-- Create index for better query performance
CREATE INDEX idx_bmi_records_created_at ON public.bmi_records(created_at DESC);