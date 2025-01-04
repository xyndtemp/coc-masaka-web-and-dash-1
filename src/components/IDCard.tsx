import { Card, CardContent } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";

type Member = {
  FirstName: string;
  LastName: string;
  Gender: string;
  'member ID': string;
  Passport: string | string[];
  Signature: string | { url: string }[] | string;
}

type IDCardProps = {
  member: Member;
}

export function IDCard({ member }: IDCardProps) {
  const passportSrc = Array.isArray(member.Passport) 
    ? member.Passport[0] 
    : member.Passport || "/placeholder.svg?height=120&width=94";

  const signatureSrc = Array.isArray(member.Signature) && member.Signature[0]?.url 
    ? member.Signature[0].url 
    : typeof member.Signature === 'string' 
      ? member.Signature 
      : "/placeholder.svg?height=56&width=188";

  return (
    <Card className="w-[85.6mm] h-[54mm] bg-white relative overflow-hidden border-[3px] border-[#363B97]">
      <CardContent className="p-0 h-full">
        {/* Header */}
        <div className="p-3 space-y-1 relative">
          <div className="absolute top-0 left-0 w-8 h-8">
            <img
              src="/coc.png"
              alt="Church Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-2 ml-10">
            <div className="flex-1">
              <h1 className="text-[#363B97] text-base font-bold text-center">
                CHURCH OF CHRIST, MASAKA
              </h1>
              <p className="text-center text-[10px] text-black font-medium">Jakanwa Road, after Old Abattoir, Masaka</p>
              <p className="text-center text-[10px] text-black font-medium">P.O.Box 424, Maraba</p>
              <p className="text-center text-[10px] text-black font-medium">Karu L.G. Area, Nasarawa State</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative h-[calc(54mm-3.5rem)]">
          <div className="bg-[#363B97] text-white py-1.5 px-2 text-sm font-bold">
            MEMBERSHIP ID CARD
          </div>
          
          <div className="flex p-3 gap-3">
            {/* Left side - Passport */}
            <div className="w-[25mm] h-[32mm] border-2 border-[#363B97] overflow-hidden">
              <img
                src={passportSrc}
                alt="Passport"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Middle - Details */}
            <div className="flex-1 space-y-1.5">
              <div className="space-y-1">
                <p className="text-sm font-semibold leading-tight">
                  {`${member.Gender} ${member.FirstName} ${member.LastName}`}
                </p>
                <p className="text-red-500 text-xs font-medium leading-tight">Member</p>
                <p className="text-xs leading-tight font-medium">ID: {member['member ID']}</p>
              </div>
            </div>

            {/* Right side - QR Code */}
            <div className="w-[25mm] h-[25mm] flex items-center justify-center border-2 border-[#363B97] bg-white">
              <QRCodeSVG 
                value={member['member ID']} 
                size={85}
                level="H"
              />
            </div>
          </div>

          {/* Signature Section */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[45mm]">
            <p className="text-red-500 text-[9px] mb-1 text-center font-medium">Holder's Signature</p>
            <div className="h-[12mm] w-full border-t-2 border-[#363B97]">
              <img
                src={signatureSrc}
                alt="Signature"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}