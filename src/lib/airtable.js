import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import Airtable from 'airtable';
import { uploadImage } from './cloudinary';

const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

let base, table;

if (apiKey && baseId && tableName) {
  base = new Airtable({ apiKey }).base(baseId);
  table = base(tableName);
}

export const isAirtableConnected = () => {
  return !!apiKey && !!baseId && !!tableName;
};

export const getMembers = async () => {
  if (!isAirtableConnected()) {
    return dummyData;
  }

  try {
    const records = await table.select().all();
    return records.map(record => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error) {
    console.error('Error fetching members from Airtable:', error);
    toast.error('Failed to fetch members');
    return [];
  }
};

export const createMember = async (data) => {
  if (!isAirtableConnected()) {
    throw new Error("Airtable is not connected. Unable to create member.");
  }

  try {
    const { id, ...fieldsToCreate } = data;
    
    // Upload images to Cloudinary and get URLs
    if (fieldsToCreate.Passport && fieldsToCreate.Passport[0]?.url.startsWith('data:')) {
      const passportUrl = await uploadImage(dataURLtoFile(fieldsToCreate.Passport[0].url, 'passport.jpg'));
      fieldsToCreate.Passport = [{ url: passportUrl }];
    }
    if (fieldsToCreate.Signature && fieldsToCreate.Signature[0]?.url.startsWith('data:')) {
      const signatureUrl = await uploadImage(dataURLtoFile(fieldsToCreate.Signature[0].url, 'signature.png'));
      fieldsToCreate.Signature = [{ url: signatureUrl }];
    }

    const record = await table.create(fieldsToCreate);
    return { id: record.id, ...record.fields };
  } catch (error) {
    console.error('Error creating member:', error);
    toast.error('Failed to create member');
    throw error;
  }
};

export const updateMember = async (id, data) => {
  if (!isAirtableConnected()) {
    throw new Error("Airtable is not connected. Unable to update member.");
  }

  try {
    const { id: _, ...fieldsToUpdate } = data;

    // Upload images to Cloudinary and get URLs
    if (fieldsToUpdate.Passport && fieldsToUpdate.Passport[0]?.url.startsWith('data:')) {
      const passportUrl = await uploadImage(dataURLtoFile(fieldsToUpdate.Passport[0].url, 'passport.jpg'));
      fieldsToUpdate.Passport = [{ url: passportUrl }];
    }
    if (fieldsToUpdate.Signature && fieldsToUpdate.Signature[0]?.url.startsWith('data:')) {
      const signatureUrl = await uploadImage(dataURLtoFile(fieldsToUpdate.Signature[0].url, 'signature.png'));
      fieldsToUpdate.Signature = [{ url: signatureUrl }];
    }

    const record = await table.update(id, fieldsToUpdate);
    return { id: record.id, ...record.fields };
  } catch (error) {
    console.error('Error updating member:', error);
    toast.error('Failed to update member');
    throw error;
  }
};

export const deleteMember = async (id) => {
  if (!isAirtableConnected()) {
    throw new Error("Airtable is not connected. Unable to delete member.");
  }

  try {
    await table.destroy(id);
  } catch (error) {
    console.error('Error deleting member:', error);
    toast.error('Failed to delete member');
    throw error;
  }
};

// Helper function to convert data URL to File object
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// Dummy data for preview
const dummyData = [
  {
    id: '1',
    'member ID': uuidv4(),
    'ID Printed': 'true',
    'Gender': 'Bro.',
    'FirstName': 'James Dakom',
    'LastName': 'Golu',
    'Signature': [{ url: 'https://via.placeholder.com/150?text=Signature' }],
    'Phone Number': '+234 123 456 7890',
    'Email': 'james.golu@example.com',
    'Marital Status': 'Married',
    'Address': '123 Main St, Masaka, Nigeria',
    'Nationality': 'Nigerian',
    'LGA': 'Jos North',
    'Passport': [{ url: 'https://via.placeholder.com/150?text=Passport' }]
  },
  {
    id: '2',
    'member ID': uuidv4(),
    'ID Printed': 'false',
    'Gender': 'Sis.',
    'FirstName': 'Oto-Obong Daniel',
    'LastName': 'Okon',
    'Phone Number': '+234 987 654 3210',
    'Email': 'oto.okon@example.com',
    'Marital Status': 'Single',
    'Address': '456 Church Rd, Masaka, Nigeria',
    'Nationality': 'Nigerian',
    'LGA': 'Uyo',
    'Passport': [{ url: 'https://via.placeholder.com/150?text=Passport' }]
  }
];
