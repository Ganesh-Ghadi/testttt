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
const index = () => {
  return (
    <>
      <div className="p-7 shadow-xl border rounded-md">
        <h2 className="text-xl pb-3 font-semibold">Roles</h2>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[100px]">Roles</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Admin</TableCell>
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
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default index;
