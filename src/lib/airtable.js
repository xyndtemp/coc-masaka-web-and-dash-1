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
    const { id, ...fieldsToCreate } = data;
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
    'Signature': [{ url: 'https://via.placeholder.com/150?text=Signature' }],
    'BarcodeImage': [{ url: 'https://via.placeholder.com/150?text=Barcode' }],
    'barcode': '26ac9d48-b1fe-4571-8e6c-2a62fe7b4c77',
    'Phone Number': '+234 123 456 7890',
    'Email': 'james.golu@example.com',
    'Marital Status': 'Married',
    'Address': '123 Main St, Masaka, Nigeria',
    'Nationality': 'Nigerian',
    'L.G.A': 'Jos North',
    'Passport': [{ url: 'https://via.placeholder.com/150?text=Passport' }]
  },
  {
    id: '2',
    'member ID': uuidv4(),
    'ID Printed': 'false',
    'Gender': 'Sis.',
    'FirstName': 'Oto-Obong Daniel',
    'LastName': 'Okon',
    'BarcodeImage': [{ url: 'https://via.placeholder.com/150?text=Barcode' }],
    'barcode': 'b0d6d8e6-3a8d-4374-a829-16ea59c8ef9a',
    'Phone Number': '+234 987 654 3210',
    'Email': 'oto.okon@example.com',
    'Marital Status': 'Single',
    'Address': '456 Church Rd, Masaka, Nigeria',
    'Nationality': 'Nigerian',
    'L.G.A': 'Uyo',
    'Passport': [{ url: 'https://via.placeholder.com/150?text=Passport' }]
  }
];
