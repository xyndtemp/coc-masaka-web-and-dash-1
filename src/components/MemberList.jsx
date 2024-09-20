import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteMember, getMembers, updateMember, createMember } from '../lib/airtable';
import MemberForm from './MemberForm';
import MemberView from './MemberView';
import { Alert, AlertDescription } from './ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { QRCodeSVG } from 'qrcode.react';
import { Loader2, Search } from 'lucide-react';
import { Input } from './ui/input';

const MemberList = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: members, isLoading, error } = useQuery({ 
    queryKey: ['members'], 
    queryFn: getMembers,
    retry: 3,
  });
  const [editingMember, setEditingMember] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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
    create: useMutation({
      mutationFn: createMember,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['members'] });
        toast.success('Member created successfully');
        setIsAddDialogOpen(false);
      },
      onError: (error) => {
        console.error('Error creating member:', error);
        toast.error('Failed to create member');
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

  const handleCreate = (data) => {
    mutations.create.mutate(data);
  };

  const filteredMembers = members?.filter(member => 
    member.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member['member ID'].toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <Alert variant="destructive"><AlertDescription>Error loading members: {error.message}</AlertDescription></Alert>;

  return (
    <>
      <div className="mb-4 flex items-center">
        <Input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
          disabled={isLoading}
        />
        <Search className="text-gray-400" />
      </div>
      <div className="mb-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Member</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
            </DialogHeader>
            <MemberForm onClose={() => setIsAddDialogOpen(false)} onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Table>
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
          <TableBody>
            {filteredMembers && filteredMembers.map((member) => (
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
                    <img src={member.Signature[0].url} alt="Signature" className="w-10 h-10 object-contain bg-white" />
                  )}
                </TableCell>
                <TableCell>
                  <QRCodeSVG value={member['member ID']} size={40} />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleView(member)} variant="outline" className="mr-2">View</Button>
                  <Button onClick={() => handleEdit(member)} variant="outline" className="mr-2">
                    {mutations.update.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Edit'}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        {mutations.delete.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
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
                        <AlertDialogAction onClick={() => handleDelete(member.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          <MemberForm member={editingMember} onClose={() => setIsEditDialogOpen(false)} onSubmit={handleUpdate} />
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
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
