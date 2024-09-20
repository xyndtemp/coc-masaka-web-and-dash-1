import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { QRCodeSVG } from 'qrcode.react';

const MemberView = ({ member }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{`${member.Gender} ${member.FirstName} ${member.LastName}`}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p><strong>Member ID:</strong> {member['member ID']}</p>
        <p><strong>ID Printed:</strong> {member['ID Printed'] ? 'Yes' : 'No'}</p>
        <p><strong>Phone Number:</strong> {member['Phone Number']}</p>
        <p><strong>Email:</strong> {member.Email}</p>
        <p><strong>Marital Status:</strong> {member['Marital Status']}</p>
        <p><strong>Address:</strong> {member.Address}</p>
        <p><strong>Nationality:</strong> {member.Nationality}</p>
        <p><strong>L.G.A:</strong> {member['L.G.A']}</p>
        {member.Passport && member.Passport[0] && (
          <div>
            <strong>Passport:</strong>
            <img src={member.Passport[0].url} alt="Passport" className="w-32 h-32 object-cover mt-2" />
          </div>
        )}
        {member.Signature && member.Signature[0] && (
          <div>
            <strong>Signature:</strong>
            <img src={member.Signature[0].url} alt="Signature" className="w-64 h-32 object-contain mt-2" />
          </div>
        )}
        <div>
          <strong>QR Code:</strong>
          <QRCodeSVG value={member['member ID']} size={128} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberView;
