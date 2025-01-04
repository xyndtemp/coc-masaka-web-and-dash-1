import { Card, CardContent } from "@/components/ui/card";
import { QRCodeSVG } from 'qrcode.react';

const IDCard = ({ member }) => {
  return (
    <Card className="w-[85.6mm] h-[54mm] bg-white">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-2 space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <h1 className="text-[#363B97] text-sm font-bold text-center">
                CHURCH OF CHRIST, MASAKA
              </h1>
              <p className="text-center text-[8px]">Jakanwa Road, after Old Abattoir, Masaka</p>
              <p className="text-center text-[8px]">P.O.Box 424, Maraba</p>
              <p className="text-center text-[8px]">Karu L.G. Area, Nasarawa State</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative">
          <div className="bg-[#363B97] text-white p-1 text-sm font-semibold">
            MEMBERSHIP ID CARD
          </div>
          
          <div className="flex p-2 gap-2">
            {/* Left side - Passport */}
            <div className="w-[25mm] h-[32mm]">
              {member.Passport && (
                <img 
                  src={Array.isArray(member.Passport) ? member.Passport[0] : member.Passport} 
                  alt="Passport"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Middle - Details */}
            <div className="flex-1 space-y-2">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">
                  {`${member.Gender} ${member.FirstName} ${member.LastName}`}
                </p>
                <p className="text-red-500 text-xs">Member</p>
                <p className="text-xs">ID: {member['member ID']}</p>
              </div>
            </div>

            {/* Right side - QR Code */}
            <div className="w-[25mm] h-[25mm]">
              <QRCodeSVG 
                value={member['member ID']} 
                size={94}
                level="H"
              />
            </div>
          </div>

          {/* Signature Section */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
            <p className="text-red-500 text-[8px] mb-0.5">Holder's Signature</p>
            <div className="w-[50mm] h-[15mm] bg-white">
              {member.Signature && (
                <img 
                  src={Array.isArray(member.Signature) && member.Signature[0]?.url 
                    ? member.Signature[0].url 
                    : member.Signature} 
                  alt="Signature"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IDCard;