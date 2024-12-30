import { QRCodeSVG } from "qrcode.react";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";

const MemberTableRow = ({ member, onView, onEdit, onDelete, isDeleting }) => (
  <TableRow key={member.id}>
    <TableCell>{member.Gender}</TableCell>
    <TableCell>{`${member.FirstName} ${member.LastName}`}</TableCell>
    <TableCell>{member["ID Printed"] ? "Yes" : "No"}</TableCell>
    <TableCell>
      {member.Passport && member.Passport[0] && (
        <img src={member.Passport[0].url} alt="Passport" className="w-10 h-10 object-cover" />
      )}
    </TableCell>
    <TableCell>
      {member.Signature && member.Signature[0] && (
        <img src={member.Signature[0].url} alt="Signature" className="w-10 h-10 object-contain bg-white" />
      )}
    </TableCell>
    <TableCell>
      <QRCodeSVG value={member["member ID"]} size={40} />
    </TableCell>
    <TableCell>
      <Button onClick={() => onView(member)} variant="outline" className="mr-2">View</Button>
      <Button onClick={() => onEdit(member)} variant="outline" className="mr-2">Edit</Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the member's data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(member.id)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TableCell>
  </TableRow>
);

export default MemberTableRow;