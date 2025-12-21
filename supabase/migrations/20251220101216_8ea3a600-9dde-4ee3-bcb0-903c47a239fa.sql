-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('photos', 'photos', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

-- Allow anyone to view photos (public bucket)
CREATE POLICY "Public can view photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos');

-- Allow authenticated users to upload photos
CREATE POLICY "Authenticated users can upload photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- Allow admins to update photos
CREATE POLICY "Admins can update photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'photos' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'photos' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete photos
CREATE POLICY "Admins can delete photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'photos' AND public.has_role(auth.uid(), 'admin'));