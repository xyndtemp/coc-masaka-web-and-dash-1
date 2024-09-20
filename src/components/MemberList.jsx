import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteMember, getMembers, updateMember } from '../lib/airtable';
import MemberForm from './MemberForm';
import MemberView from './MemberView';
import { Alert, AlertDescription } from './ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import Barcode from 'react-barcode';

const MemberList = () => {
  const queryClient = useQueryClient();
  const { data: members, isLoading, error } = useQuery({ 
    queryKey: ['members'], 
    queryFn: getMembers,
    retry: 3,
  });
  const [editingMember, setEditingMember] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const mutations = {
    delete: useMutation({
      mutationFn: deleteMember,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['members'] });
        toast.success('Member deleted successfully');
      },
      onError: (error) => {
        console.error('Error deleting member:', error);
        toast.error('Failed to delete member');
      },
    }),
    update: useMutation({
      mutationFn: (data) => updateMember(data.id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['members'] });
        toast.success('Member updated successfully');
        setIsEditDialogOpen(false);
      },
      onError: (error) => {
        console.error('Error updating member:', error);
        toast.error('Failed to update member');
      },
    }),
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setIsEditDialogOpen(true);
  };

  const handleView = (member) => {
    setViewingMember(member);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (id) => {
    mutations.delete.mutate(id);
  };

  const handleUpdate = (data) => {
    mutations.update.mutate({ id: editingMember.id, ...data });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <Alert variant="destructive"><AlertDescription>Error loading members: {error.message}</AlertDescription></Alert>;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gender</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>ID Printed</TableHead>
            <TableHead>Passport</TableHead>
            <TableHead>Signature</TableHead>
            <TableHead>Barcode</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members && members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.Gender}</TableCell>
              <TableCell>{`${member.FirstName} ${member.LastName}`}</TableCell>
              <TableCell>{member['ID Printed'] ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                {member.Passport && member.Passport[0] && (
                  <img src={member.Passport[0].url} alt="Passport" className="w-10 h-10 object-cover" />
                )}
              </TableCell>
              <TableCell>
                {member.Signature && member.Signature[0] && (
                  <img src={member.Signature[0].url} alt="Signature" className="w-10 h-10 object-cover" />
                )}
              </TableCell>
              <TableCell>
                <Barcode value={member['member ID']} height={30} width={1} />
              </TableCell>
              <TableCell>
                <Button onClick={() => handleView(member)} variant="outline" className="mr-2">View</Button>
                <Button onClick={() => handleEdit(member)} variant="outline" className="mr-2">Edit</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
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
                      <AlertDialogAction onClick={() => handleDelete(member.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          <MemberForm member={editingMember} onClose={() => setIsEditDialogOpen(false)} onSubmit={handleUpdate} />
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View Member</DialogTitle>
          </DialogHeader>
          <MemberView member={viewingMember} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MemberList;
