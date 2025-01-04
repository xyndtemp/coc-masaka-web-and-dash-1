import { Card, CardContent } from "@/components/ui/card"
import { QRCodeSVG } from "qrcode.react"

interface Member {
  FirstName: string
  LastName: string
  Gender: string
  'member ID': string
  Passport: string | string[]
  Signature: string | { url: string }[] | string
}

interface IDCardProps {
  member: Member
}

export default function IDCard({ member }: IDCardProps) {
  const passportSrc = Array.isArray(member.Passport) 
    ? member.Passport[0] 
    : member.Passport || "/placeholder.svg?height=120&width=94"

  const signatureSrc = Array.isArray(member.Signature) && member.Signature[0]?.url 
    ? member.Signature[0].url 
    : typeof member.Signature === 'string' 
      ? member.Signature 
      : "/placeholder.svg?height=56&width=188"

  return (
    <Card className="w-[85.6mm] h-[54mm] bg-white relative overflow-hidden border-2 border-[#363B97]">
      <CardContent className="p-0 h-full">
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
        <div className="relative h-[calc(54mm-2.5rem)]">
          <div className="bg-[#363B97] text-white p-1 text-sm font-semibold">
            MEMBERSHIP ID CARD
          </div>
          
          <div className="flex p-2 gap-2">
            {/* Left side - Passport */}
            <div className="w-[25mm] h-[32mm] border-2 border-[#363B97] overflow-hidden">
              <img
                src={passportSrc}
                alt="Passport"
                className="w-full h-full object-cover"
              />
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
            <div className="w-[25mm] h-[25mm] flex items-center justify-center border-2 border-[#363B97]">
              <QRCodeSVG 
                value={member['member ID']} 
                size={90}
                level="H"
              />
            </div>
          </div>

          {/* Signature Section */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[50mm]">
            <p className="text-red-500 text-[8px] mb-0.5 text-center">Holder's Signature</p>
            <div className="h-[15mm] w-full">
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
  )
}

