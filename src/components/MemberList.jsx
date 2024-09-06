import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format, isToday, parseISO } from 'date-fns';
import { useState } from 'react';
import { toast } from 'sonner';
import { createMember, deleteMember, getMembers, updateMember } from '../lib/airtable';
import { sendEmail } from '../lib/emailService';
import BulkEmailModal from './BulkEmailModal';
import EmailModal from './EmailModal';
import MemberForm from './MemberForm';
import { Alert, AlertDescription } from './ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const MemberList = () => {
  const queryClient = useQueryClient();
  const { data: members, isLoading, error } = useQuery({ 
    queryKey: ['members'], 
    queryFn: getMembers,
    retry: 3,
  });
  const [editingMember, setEditingMember] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isBulkEmailModalOpen, setIsBulkEmailModalOpen] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);

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
        setIsEditDialogOpen(false);
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

  const handleDelete = (id) => {
    mutations.delete.mutate(id);
  };

  const handleUpdate = (data) => {
    if (editingMember) {
      mutations.update.mutate({ id: editingMember.id, ...data });
    } else {
      mutations.create.mutate(data);
    }
  };

  const handleSendEmail = (member) => {
    setEmailRecipient(member);
    setIsEmailModalOpen(true);
  };

  const handleEmailSend = async (emailData) => {
    try {

      await sendEmail({
        to: emailRecipient.email,
        subject: emailData.subject,
        body: emailData.html
      });
      toast.success('Email sent successfully');
      setIsEmailModalOpen(false);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    }
  };

  const handleBulkEmailSend = async (emailData) => {
    try {

      for (const memberId of selectedMembers) {
        const member = members.find(m => m.id === memberId);
        await sendEmail({
          to: member.email,
          subject: emailData.subject,
          body: emailData.html
        });
      }
      toast.success('Bulk emails sent successfully');
      setIsBulkEmailModalOpen(false);
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error sending bulk emails:', error);
      toast.error('Failed to send bulk emails');
    }
  };

  const handleCheckboxChange = (memberId) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedMembers(members.map(member => member.id));
    } else {
      setSelectedMembers([]);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <Alert variant="destructive"><AlertDescription>Error loading members: {error.message}</AlertDescription></Alert>;

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <Button
          onClick={() => setIsBulkEmailModalOpen(true)}
          disabled={selectedMembers.length === 0}
        >
          Send Bulk Email ({selectedMembers.length})
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedMembers.length === members.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Birthday</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members && members.map((member) => (
            <TableRow key={member.id} className={isToday(parseISO(member.Birthday)) ? 'bg-yellow-100' : ''}>
              <TableCell>
                <Checkbox
                  checked={selectedMembers.includes(member.id)}
                  onCheckedChange={() => handleCheckboxChange(member.id)}
                />
              </TableCell>
              <TableCell>{member.Name || 'N/A'}</TableCell>
              <TableCell>{member.email || 'N/A'}</TableCell>
              <TableCell>{member.Birthday ? format(parseISO(member.Birthday), 'MMM dd, yyyy') : 'N/A'}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(member)} variant="outline" className="mr-2">Edit</Button>
                <Button onClick={() => handleSendEmail(member)} variant="outline" className="mr-2">Send Email</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the member&apos;s data.
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
          </DialogHeader>
          <MemberForm member={editingMember} onClose={() => setIsEditDialogOpen(false)} onSubmit={handleUpdate} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email to {emailRecipient?.Name}</DialogTitle>
          </DialogHeader>
          <EmailModal onClose={() => setIsEmailModalOpen(false)} onSend={handleEmailSend} />
        </DialogContent>
      </Dialog>

      <Dialog open={isBulkEmailModalOpen} onOpenChange={setIsBulkEmailModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Send Bulk Email</DialogTitle>
          </DialogHeader>
          <BulkEmailModal onClose={() => setIsBulkEmailModalOpen(false)} onSend={handleBulkEmailSend} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MemberList;