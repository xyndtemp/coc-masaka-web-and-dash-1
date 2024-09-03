import React, { useState } from 'react';
import MemberList from '../components/MemberList';
import MemberForm from '../components/MemberForm';
import EmailModal from '../components/EmailModal';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { isAirtableConnected } from '../lib/airtable';
import { sendManualEmail } from '../lib/emailService';
import { toast } from 'sonner';

const Index = () => {
  const [editingMember, setEditingMember] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const handleEdit = (member) => {
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setEditingMember(null);
    setIsDialogOpen(false);
  };

  const handleSendEmail = async (emailData) => {
    try {
      await sendManualEmail(emailData);
      toast.success('Email sent successfully');
    } catch (error) {
      toast.error('Failed to send email');
      console.error('Error sending email:', error);
    }
  };

  const airtableConnected = isAirtableConnected();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Member Dashboard</h1>
      {!airtableConnected && (
        <Alert variant="warning" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Airtable is not connected. Using test data. CRUD operations are disabled.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between mb-4">
        {airtableConnected && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
              </DialogHeader>
              <MemberForm member={editingMember} onClose={handleClose} />
            </DialogContent>
          </Dialog>
        )}
        <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
          <DialogTrigger asChild>
            <Button>Send Manual Email</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Manual Email</DialogTitle>
            </DialogHeader>
            <EmailModal onClose={() => setIsEmailModalOpen(false)} onSend={handleSendEmail} />
          </DialogContent>
        </Dialog>
      </div>
      <MemberList onEdit={handleEdit} />
    </div>
  );
};

export default Index;