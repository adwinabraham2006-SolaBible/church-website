import { supabaseAdmin } from './supabase';

export async function uploadFile(
  bucket: string,
  file: File,
  folder?: string
): Promise<string | null> {
  if (!supabaseAdmin) {
    console.error('Supabase admin client not available');
    return null;
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  const { data: urlData } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

export async function deleteFile(bucket: string, url: string): Promise<boolean> {
  if (!supabaseAdmin) {
    console.error('Supabase admin client not available');
    return false;
  }

  // Extract file path from URL
  const urlParts = url.split(`/storage/v1/object/public/${bucket}/`);
  if (urlParts.length !== 2) return false;

  const filePath = urlParts[1];

  const { error } = await supabaseAdmin.storage.from(bucket).remove([filePath]);

  if (error) {
    console.error('Delete error:', error);
    return false;
  }

  return true;
}
