-- Create hero_images table for homepage slider
CREATE TABLE public.hero_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;

-- Admins can manage hero images
CREATE POLICY "Admins can manage hero images"
ON public.hero_images
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Public can view active hero images
CREATE POLICY "Public can view active hero images"
ON public.hero_images
FOR SELECT
USING (is_active = true);

-- Add trigger for updated_at
CREATE TRIGGER update_hero_images_updated_at
BEFORE UPDATE ON public.hero_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();