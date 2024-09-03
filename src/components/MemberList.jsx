import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMembers, deleteMember } from '../lib/airtable';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const MemberList = ({ onEdit }) => {
  const queryClient = useQueryClient();
  const { data: members, isLoading } = useQuery({ queryKey: ['members'], queryFn: getMembers });

  const deleteMutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
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
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>{member.Name}</TableCell>
            <TableCell>{member.Email}</TableCell>
            <TableCell>{member.Birthday}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(member)} variant="outline" className="mr-2">Edit</Button>
              <Button onClick={() => deleteMutation.mutate(member.id)} variant="destructive">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MemberList;