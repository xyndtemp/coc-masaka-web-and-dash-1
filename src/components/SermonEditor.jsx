import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

const SermonEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    try {
      // Here you would typically save to your backend
      // For now, we'll just show a success message
      toast.success("Sermon saved successfully");
    } catch (error) {
      toast.error("Failed to save sermon");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Sermon Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="h-[400px] mb-12"
      />
      <Button onClick={handleSave}>Save Sermon</Button>
    </div>
  );
};

export default SermonEditor;