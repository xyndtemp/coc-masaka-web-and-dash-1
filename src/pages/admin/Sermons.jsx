import AdminLayout from "../../components/layouts/AdminLayout";
import SermonEditor from "../../components/SermonEditor";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Sermons = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Sermons Management</h1>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "View Sermons" : "New Sermon"}
          </Button>
        </div>
        
        {isEditing ? (
          <SermonEditor />
        ) : (
          <div className="bg-white p-6 rounded-lg">
            <p>Your saved sermons will appear here.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Sermons;