import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MemberForm from "../components/MemberForm";
import MemberList from "../components/MemberList";
import SEOHead from "../components/SEOHead";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useAuth } from "../context/AuthContext";
import { createMember, isAirtableConnected } from "../lib/airtable";

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const queryClient = useQueryClient();

  const createMemberMutation = useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries("members");
      toast.success("Member created successfully");
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error creating member:", error);
      toast.error("Failed to create member");
    },
  });

  const handleCreateMember = (data) => {
    createMemberMutation.mutate(data);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const airtableConnected = isAirtableConnected();

  return (
    <>
      <SEOHead
        title="COC Masaka Member Management System"
        description="Manage COC Masaka members efficiently."
        canonicalUrl="https://www.cocmasaka.org/dashboard"
      />
      <div className="container mx-auto p-4">
        <Header
          toggleTheme={toggleTheme}
          theme={theme}
          handleLogout={handleLogout}
        />
        <Alerts airtableConnected={airtableConnected} />
        <AddMemberButton
          airtableConnected={airtableConnected}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          handleCreateMember={handleCreateMember}
        />
        <MemberList />
      </div>
    </>
  );
};

const Header = ({ toggleTheme, theme, handleLogout }) => (
  <div className="flex justify-between items-center mb-4">
    <div>
      <h1 className="text-3xl font-bold">COC Masaka Member Management System</h1>
      <h2 className="text-xl text-gray-600 dark:text-gray-400">
        Member Dashboard
      </h2>
    </div>
    <div className="flex items-center space-x-2">
      <Button onClick={toggleTheme} variant="outline" size="icon">
        {theme === "dark" ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  </div>
);

const Alerts = ({ airtableConnected }) => (
  <>
    {!airtableConnected && (
      <Alert variant="warning" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Airtable is not connected. Using test data. CRUD operations are
          disabled.
        </AlertDescription>
      </Alert>
    )}
  </>
);

const AddMemberButton = ({
  airtableConnected,
  isDialogOpen,
  setIsDialogOpen,
  handleCreateMember,
}) => (
  <div className="mb-4">
    {airtableConnected && (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <MemberForm
            onClose={() => setIsDialogOpen(false)}
            onSubmit={handleCreateMember}
          />
        </DialogContent>
      </Dialog>
    )}
  </div>
);

export default Index;
