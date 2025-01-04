import { useQuery } from "@tanstack/react-query";
import { getMembers } from "@/lib/airtable";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const IDCard = ({ member }) => (
  <div className="w-[85.6mm] h-[54mm] relative bg-white border border-gray-200 overflow-hidden page-break-after-always">
    <div className="absolute top-0 left-0 w-full">
      <img 
        src="/lovable-uploads/c76e2659-4e13-4667-a07c-abd7d7ed7ccb.png" 
        alt="ID Card Template" 
        className="w-full"
      />
    </div>
    
    {/* Passport Photo Area */}
    <div className="absolute top-[35px] left-[25px] w-[100px] h-[120px]">
      {member.Passport && (
        <img 
          src={Array.isArray(member.Passport) ? member.Passport[0] : member.Passport} 
          alt="Member Passport" 
          className="w-full h-full object-cover"
        />
      )}
    </div>

    {/* Member Details */}
    <div className="absolute top-[170px] left-[25px] text-black">
      <p className="font-bold">{`${member.Gender} ${member.FirstName} ${member.LastName}`}</p>
      <p className="text-sm mt-1">ID: {member['member ID']}</p>
    </div>

    {/* Signature */}
    <div className="absolute bottom-[20px] left-[25px] w-[150px] h-[50px]">
      {member.Signature && (
        <img 
          src={Array.isArray(member.Signature) && typeof member.Signature[0] === 'object' 
            ? member.Signature[0].url 
            : member.Signature} 
          alt="Signature" 
          className="w-full h-full object-contain"
        />
      )}
    </div>

    {/* QR Code */}
    <div className="absolute bottom-[20px] right-[25px] w-[50px] h-[50px]">
      {member.BarcodeImage && (
        <img 
          src={Array.isArray(member.BarcodeImage) && member.BarcodeImage[0]?.url 
            ? member.BarcodeImage[0].url 
            : member.BarcodeImage} 
          alt="QR Code" 
          className="w-full h-full"
        />
      )}
    </div>
  </div>
);

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
          <Card className="p-6">
            <p className="text-center text-gray-500">No pending ID cards to print</p>
          </Card>
        ) : (
          <>
            <div className="hidden">
              <div ref={printRef} className="p-4">
                {pendingIDs.map((member) => (
                  <IDCard key={member.id} member={member} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingIDs.map((member) => (
                <Card key={member.id} className="p-4">
                  <IDCard member={member} />
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default PrintIDs;