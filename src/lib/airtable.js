import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import Airtable from 'airtable';

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
    const fieldsToCreate = {
      ...data,
      'member ID': data['member ID'] || uuidv4(),
      'barcode': uuidv4(),
    };

    // Handle file attachments
    if (data.Passport && Array.isArray(data.Passport)) {
      fieldsToCreate.Passport = data.Passport.map(attachment => ({
        url: attachment.url,
        filename: attachment.filename,
      }));
    }
    
    if (data.Signature && Array.isArray(data.Signature)) {
      fieldsToCreate.Signature = data.Signature.map(attachment => ({
        url: attachment.url,
        filename: attachment.filename,
      }));
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
    
    // Handle file attachments
    if (data.Passport) {
      fieldsToUpdate.Passport = Array.isArray(data.Passport) ? data.Passport : [data.Passport];
    }
    if (data.Signature) {
      fieldsToUpdate.Signature = Array.isArray(data.Signature) ? data.Signature : [data.Signature];
    }
    if (data.BarcodeImage) {
      fieldsToUpdate.BarcodeImage = Array.isArray(data.BarcodeImage) ? data.BarcodeImage : [data.BarcodeImage];
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

// Dummy data for preview
const dummyData = [
  {
    id: '1',
    'member ID': uuidv4(),
    'ID Printed': 'true',
    'Gender': 'Bro.',
    'FirstName': 'James Dakom',
    'LastName': 'Golu',
    'Signature': 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    'Phone Number': '+234 123 456 7890',
    'Email': 'james.golu@example.com',
    'Marital Status': 'Married',
    'Address': '123 Main St, Masaka, Nigeria',
    'Nationality': 'Nigerian',
    'LGA': 'Jos North',
    'Passport': 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
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
    'Passport': 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
  }
];
