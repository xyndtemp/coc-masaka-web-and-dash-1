import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const RadioUploader = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "audio/mpeg") {
      setFile(selectedFile);
    } else {
      toast.error("Please select an MP3 file");
    }
  };

  const handleUpload = async () => {
    try {
      // Here you would typically upload to your backend
      // For now, we'll just show a success message
      toast.success("Radio recording uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload recording");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Episode Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <Textarea
        placeholder="Episode Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-h-[100px]"
      />
      
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input
          type="file"
          accept=".mp3"
          onChange={handleFileChange}
          className="hidden"
          id="radio-file"
        />
        <label htmlFor="radio-file" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">Click to upload MP3 file or drag and drop</p>
          <p className="text-sm text-gray-500">MP3 files only</p>
        </label>
        {file && (
          <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
        )}
      </div>
      
      <Button onClick={handleUpload} disabled={!file || !title}>
        Upload Episode
      </Button>
    </div>
  );
};

export default RadioUploader;