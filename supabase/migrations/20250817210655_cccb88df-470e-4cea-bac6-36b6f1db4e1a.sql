-- Add phone field to profiles table for WhatsApp integration
ALTER TABLE public.profiles 
ADD COLUMN phone TEXT;

-- Create index for phone lookup
CREATE INDEX idx_profiles_phone ON public.profiles(phone);