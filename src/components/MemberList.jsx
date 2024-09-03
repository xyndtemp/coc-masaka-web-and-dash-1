import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMembers, deleteMember } from '../lib/airtable';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import MemberForm from './MemberForm';
import EmailModal from './EmailModal';
import { format, isToday } from 'date-fns';
import { sendManualEmail } from '../lib/emailService';
import { toast } from 'sonner';

const MemberList = ({ onEdit }) => {
  const queryClient = useQueryClient();
  const { data: members, isLoading } = useQuery({ queryKey: ['members'], queryFn: getMembers });
  const [editingMember, setEditingMember] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingMember, setDeletingMember] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState(null);

  const deleteMutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });

  const handleEdit = (member) => {
    setEditingMember(member);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (member) => {
    setDeletingMember(member);
  };

  const confirmDelete = () => {
    if (deletingMember) {
      deleteMutation.mutate(deletingMember.id);
      setDeletingMember(null);
    }
  };

  const closeEditDialog = () => {
    setEditingMember(null);
    setIsEditDialogOpen(false);
  };

  const handleSendEmail = (member) => {
    setEmailRecipient(member);
    setIsEmailModalOpen(true);
  };

  const handleEmailSend = async (emailData) => {
    try {
      await sendManualEmail({
        to: emailRecipient.Email,
        subject: emailData.subject,
        content: emailData.content
      });
      toast.success('Email sent successfully');
      setIsEmailModalOpen(false);
    } catch (error) {
      toast.error('Failed to send email');
      console.error('Error sending email:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Birthday</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => {
            const isBirthday = isToday(new Date(member.Birthday));
            return (
              <TableRow key={member.id} className={isBirthday ? 'bg-yellow-100' : ''}>
                <TableCell>{member.Name}</TableCell>
                <TableCell>{member.Email}</TableCell>
                <TableCell>{format(new Date(member.Birthday), 'MMM dd, yyyy')}</TableCell>
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
                          This action cannot be undone. This will permanently delete the member's data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteMutation.mutate(member.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          <MemberForm member={editingMember} onClose={closeEditDialog} />
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
    </>
  );
};

export default MemberList;