-- Add region column to user_surveys table
ALTER TABLE public.user_surveys 
ADD COLUMN IF NOT EXISTS region text;