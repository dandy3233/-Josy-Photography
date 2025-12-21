import { supabase } from '@/integrations/supabase/client';

export const uploadPhoto = async (file: File, folder: string = 'gallery'): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error } = await supabase.storage
    .from('photos')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('photos')
    .getPublicUrl(fileName);

  return publicUrl;
};

export const deletePhoto = async (url: string): Promise<boolean> => {
  // Extract the path from the URL
  const path = url.split('/photos/')[1];
  if (!path) return false;

  const { error } = await supabase.storage
    .from('photos')
    .remove([path]);

  return !error;
};
