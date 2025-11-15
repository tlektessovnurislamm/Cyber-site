-- Создание таблицы для отчетов о мошенничестве
CREATE TABLE public.fraud_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  phone TEXT,
  link TEXT,
  description TEXT NOT NULL,
  name TEXT,
  contact TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Включить RLS
ALTER TABLE public.fraud_reports ENABLE ROW LEVEL SECURITY;

-- Политики: все могут создавать отчеты (публичная форма)
CREATE POLICY "Anyone can create fraud reports" 
ON public.fraud_reports 
FOR INSERT 
TO public
WITH CHECK (true);

-- Политики: все могут просматривать свои отчеты
CREATE POLICY "Anyone can view fraud reports" 
ON public.fraud_reports 
FOR SELECT 
TO public
USING (true);

-- Триггер для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_fraud_reports_updated_at
BEFORE UPDATE ON public.fraud_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();