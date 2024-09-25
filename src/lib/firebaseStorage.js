import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './firebase'; // Ensure you have initialized Firebase in a separate file

const storage = getStorage(app);

export const uploadToFirebase = async (file) => {
  const storageRef = ref(storage, 'images/' + file.name);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};