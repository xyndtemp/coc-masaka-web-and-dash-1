import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/lib/airtable";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import IDCard from "@/components/IDCard";

const PrintIDs = () => {
  const printRef = useRef();
  const { data: members, isLoading, error } = useQuery({ 
    queryKey: ["members"], 
    queryFn: getMembers 
  });

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  if (error) return (
    <AdminLayout>
      <Alert variant="destructive">
        <AlertDescription>Error loading members: {error.message}</AlertDescription>
      </Alert>
    </AdminLayout>
  );

  if (isLoading) return (
    <AdminLayout>
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    </AdminLayout>
  );

  const pendingIDs = members?.filter(member => member['ID Printed'] === 'false') || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Print ID Cards</h1>
          <Button 
            onClick={handlePrint}
            disabled={pendingIDs.length === 0}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print {pendingIDs.length} ID Cards
          </Button>
        </div>

        {pendingIDs.length === 0 ? (
          <div className="p-6 text-center bg-background border rounded-lg">
            <p className="text-muted-foreground">No pending ID cards to print</p>
          </div>
        ) : (
          <>
            {/* Hidden printable content */}
            <div className="hidden">
              <div ref={printRef} className="p-4 space-y-4">
                {pendingIDs.map((member) => (
                  <IDCard key={member.id} member={member} />
                ))}
              </div>
            </div>

            {/* Preview grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingIDs.map((member) => (
                <div key={member.id} className="bg-background border rounded-lg p-4">
                  <IDCard member={member} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default PrintIDs;