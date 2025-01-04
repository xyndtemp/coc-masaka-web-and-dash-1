import { QRCodeSVG } from 'qrcode.react';

const IDCard = ({ member }) => {
  return (
    <div className="relative w-[85.6mm] h-[54mm] bg-white shadow-lg overflow-hidden">
      {/* Background Template */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/c76e2659-4e13-4667-a07c-abd7d7ed7ccb.png" 
          alt="ID Card Template" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-4 flex flex-col h-full">
        <div className="flex justify-between">
          {/* Left Side - Passport */}
          <div className="w-[25mm] h-[32mm]">
            {member.Passport && (
              <img 
                src={Array.isArray(member.Passport) ? member.Passport[0] : member.Passport} 
                alt="Passport"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Middle - Member Details */}
          <div className="flex-1 px-4 text-center">
            <h2 className="text-lg font-bold text-black">
              {`${member.Gender} ${member.FirstName} ${member.LastName}`}
            </h2>
            <p className="text-sm text-black mt-1">ID: {member['member ID']}</p>
          </div>

          {/* Right Side - QR Code */}
          <div className="w-[25mm] h-[25mm]">
            <QRCodeSVG 
              value={member['member ID']} 
              size={94} // 25mm ≈ 94px at 96dpi
              level="H"
            />
          </div>
        </div>

        {/* Bottom - Signature */}
        <div className="mt-auto flex justify-center">
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
    </div>
  );
};

export default IDCard;