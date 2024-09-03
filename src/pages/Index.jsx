import React, { useState } from 'react';
import MemberList from '../components/MemberList';
import MemberForm from '../components/MemberForm';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

const Index = () => {
  const [editingMember, setEditingMember] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (member) => {
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setEditingMember(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Member Dashboard</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Member</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
          </DialogHeader>
          <MemberForm member={editingMember} onClose={handleClose} />
        </DialogContent>
      </Dialog>
      <MemberList onEdit={handleEdit} />
    </div>
  );
};

export default Index;