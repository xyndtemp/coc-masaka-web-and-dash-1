import { put } from '@vercel/blob';

export const uploadToVercelBlob = async (file) => {
  try {
    const { url } = await put(file.name, file, {
      access: 'public',
    });
    return url;
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    throw error;
  }
};