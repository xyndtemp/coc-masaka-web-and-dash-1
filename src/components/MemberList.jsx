import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMembers, deleteMember, updateMember } from '../lib/airtable';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Checkbox } from './ui/checkbox';
import MemberForm from './MemberForm';
import EmailModal from './EmailModal';
import BulkEmailModal from './BulkEmailModal';
import { format, isToday, parseISO } from 'date-fns';
import { sendManualEmail } from '../lib/emailService';
import { toast } from 'sonner';
import { Alert, AlertDescription } from './ui/alert';

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

  const deleteMutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast.success('Member deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error deleting member: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast.success('Member updated successfully');
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Error updating member: ${error.message}`);
    },
  });

  const handleEdit = (member) => {
    setEditingMember(member);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleUpdate = (data) => {
    updateMutation.mutate([editingMember.id, data]);
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

  const handleBulkEmailSend = async (emailData) => {
    try {
      for (const memberId of selectedMembers) {
        const member = members.find(m => m.id === memberId);
        await sendManualEmail({
          to: member.Email,
          subject: emailData.subject,
          content: emailData.content
        });
      }
      toast.success('Bulk emails sent successfully');
      setIsBulkEmailModalOpen(false);
      setSelectedMembers([]);
    } catch (error) {
      toast.error('Failed to send bulk emails');
      console.error('Error sending bulk emails:', error);
    }
  };

  const handleCheckboxChange = (memberId) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
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
            <TableHead className="w-[50px]">Select</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Birthday</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members && members.map((member) => {
            const isBirthday = member.Birthday ? isToday(parseISO(member.Birthday)) : false;
            return (
              <TableRow key={member.id} className={isBirthday ? 'bg-yellow-100' : ''}>
                <TableCell>
                  <Checkbox
                    checked={selectedMembers.includes(member.id)}
                    onCheckedChange={() => handleCheckboxChange(member.id)}
                  />
                </TableCell>
                <TableCell>{member.Name || 'N/A'}</TableCell>
                <TableCell>{member.Email || 'N/A'}</TableCell>
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
            );
          })}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
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
        <DialogContent>
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