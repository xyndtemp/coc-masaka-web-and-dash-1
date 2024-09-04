import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberList from '../components/MemberList';
import MemberForm from '../components/MemberForm';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { AlertCircle, Moon, Sun } from 'lucide-react';
import { isAirtableConnected } from '../lib/airtable';
import { useAuth } from '../context/AuthContext';
import { useTheme } from 'next-themes';

const Index = () => {
  const [editingMember, setEditingMember] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleEdit = (member) => {
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setEditingMember(null);
    setIsDialogOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const airtableConnected = isAirtableConnected();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">GreenField Member Contact System</h1>
          <h2 className="text-xl text-gray-600 dark:text-gray-400">Member Dashboard</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={toggleTheme} variant="outline" size="icon">
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      {!airtableConnected && (
        <Alert variant="warning" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Airtable is not connected. Using test data. CRUD operations are disabled.
          </AlertDescription>
        </Alert>
      )}
      <div className="mb-4">
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
      </div>
      <MemberList onEdit={handleEdit} />
    </div>
  );
};

export default Index;