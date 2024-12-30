export const handleFileUpload = async (file) => {
  try {
    // Convert file to base64
    const base64String = await fileToBase64(file);
    
    // Create a temporary URL for the file
    const blob = base64ToBlob(base64String);
    const url = URL.createObjectURL(blob);
    
    return [{
      url: url,
      filename: file.name,
      type: file.type,
      size: file.size
    }];
  } catch (error) {
    console.error('Error handling file upload:', error);
    throw error;
  }
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const base64ToBlob = (base64String) => {
  const parts = base64String.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};