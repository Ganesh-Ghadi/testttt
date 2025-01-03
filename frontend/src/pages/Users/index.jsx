import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import {
  File,
  PlusCircle,
  Search,
  Pencil,
  Trash,
  MoreHorizontal,
  ListFilter,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
const index = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const navigate = useNavigate();
  const {
    data: UsersData,
    isLoading: isUsersDataLoading,
    isError: isUsersDataError,
  } = useQuery({
    queryKey: ['users'], // This is the query key
    queryFn: async () => {
      // The query function to fetch roles data
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profiles', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data?.data.Profiles; // Return the fetched data
      } catch (error) {
        throw new Error(error.message); // Throw error if fetch fails
      }
    },
  });

  if (isUsersDataError) {
    return <p>Error fetching data</p>;
  }
  return (
    <>
      <div className="px-5 pb-7 pt-1 w-full bg-white shadow-xl border rounded-md">
        <div className="w-full p-3 flex justify-between items-center">
          <h2 className="text-xl font-medium">Users</h2>
          <Button
            onClick={() => navigate('/users/create')}
            variant=""
            className="text-sm"
          >
            Add Users
          </Button>
        </div>
        <Table>
          <TableCaption>A list of your Users.</TableCaption>
          <TableHeader className="bg-slate-100 rounded-md">
            <TableRow>
              <TableHead className="w-[100px]">Roles</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {UsersData &&
              UsersData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.profile_name}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="center"
                        className="w-full flex-col items-center flex justify-center"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <b className="border border-gray-100 w-full"></b>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-sm"
                        >
                          Edit
                        </Button>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default index;
