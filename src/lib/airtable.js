import Airtable from 'airtable';

const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_API_KEY }).base(import.meta.env.VITE_AIRTABLE_BASE_ID);
const table = base(import.meta.env.VITE_AIRTABLE_TABLE_NAME);

export const getMembers = async () => {
  const records = await table.select().all();
  return records.map(record => ({
    id: record.id,
    ...record.fields
  }));
};

export const createMember = async (data) => {
  const record = await table.create(data);
  return { id: record.id, ...record.fields };
};

export const updateMember = async (id, data) => {
  const record = await table.update(id, data);
  return { id: record.id, ...record.fields };
};

export const deleteMember = async (id) => {
  await table.destroy(id);
};