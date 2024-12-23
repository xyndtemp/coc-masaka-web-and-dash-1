import AdminLayout from "../../components/layouts/AdminLayout";
import RadioUploader from "../../components/RadioUploader";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const RadioRecordings = () => {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Radio Recordings Management</h1>
          <Button onClick={() => setIsUploading(!isUploading)}>
            {isUploading ? "View Recordings" : "Upload New Recording"}
          </Button>
        </div>
        
        {isUploading ? (
          <RadioUploader />
        ) : (
          <div className="bg-white p-6 rounded-lg">
            <p>Your uploaded radio recordings will appear here.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default RadioRecordings;