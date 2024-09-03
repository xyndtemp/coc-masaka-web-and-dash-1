import Airtable from 'airtable';
import testUsers from '../data/testUsers.json';

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
    return testUsers;
  }

  const records = await table.select().all();
  return records.map(record => ({
    id: record.id,
    ...record.fields
  }));
};

export const createMember = async (data) => {
  if (!isAirtableConnected()) {
    throw new Error("Airtable is not connected. Unable to create member.");
  }

  const record = await table.create(data);
  return { id: record.id, ...record.fields };
};

export const updateMember = async (id, data) => {
  if (!isAirtableConnected()) {
    throw new Error("Airtable is not connected. Unable to update member.");
  }

  const record = await table.update(id, data);
  return { id: record.id, ...record.fields };
};

export const deleteMember = async (id) => {
  if (!isAirtableConnected()) {
    throw new Error("Airtable is not connected. Unable to delete member.");
  }

  await table.destroy(id);
};