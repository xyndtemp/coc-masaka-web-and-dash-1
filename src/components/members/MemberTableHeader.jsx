import { TableHead, TableHeader, TableRow } from "../ui/table";

const MemberTableHeader = () => (
  <TableHeader>
    <TableRow>
      <TableHead>Gender</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>ID Printed</TableHead>
      <TableHead>Passport</TableHead>
      <TableHead>Signature</TableHead>
      <TableHead>QR Code</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
);

export default MemberTableHeader;