import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { deleteMember, getMembers, updateMember, createMember } from "../lib/airtable";
import MemberForm from "./MemberForm";
import MemberView from "./MemberView";
import { Alert, AlertDescription } from "./ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody } from "./ui/table";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { debounce } from "lodash";
import MemberTableHeader from "./members/MemberTableHeader";
import MemberTableRow from "./members/MemberTableRow";
import MemberSearch from "./members/MemberSearch";

const MemberList = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: members, isLoading, error } = useQuery({ 
    queryKey: ["members"], 
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
        queryClient.invalidateQueries({ queryKey: ["members"] });
        toast.success("Member deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting member:", error);
        toast.error("Failed to delete member");
      },
    }),
    update: useMutation({
      mutationFn: (data) => updateMember(data.id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["members"] });
        toast.success("Member updated successfully");
        setIsEditDialogOpen(false);
      },
      onError: (error) => {
        console.error("Error updating member:", error);
        toast.error("Failed to update member");
      },
    }),
    create: useMutation({
      mutationFn: createMember,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["members"] });
        toast.success("Member created successfully");
        setIsAddDialogOpen(false);
      },
      onError: (error) => {
        console.error("Error creating member:", error);
        toast.error("Failed to create member");
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

  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const filteredMembers = members?.filter(member => 
    member.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member["member ID"]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <Alert variant="destructive"><AlertDescription>Error loading members: {error.message}</AlertDescription></Alert>;

  return (
    <>
      <MemberSearch onChange={handleSearchChange} disabled={isLoading} />
      
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
          <MemberTableHeader />
          <TableBody>
            {filteredMembers && filteredMembers.map((member) => (
              <MemberTableRow
                key={member.id}
                member={member}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={mutations.delete.isPending}
              />
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