import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserType } from '@/lib/schema/user.schema';
import { SheetHoc } from '../SheetHoc';
import UserCreateForm from '../UserCreateForm';

export const columns: ColumnDef<UserType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50,
    maxSize: 50,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'phone',
    header: () => <div className="text-right">Phone</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue('phone')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const isAdmin = row.original.role == 'admin';
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" disabled={!isAdmin} className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                console.log('deleted');
              }}
              className="w-full"
            >
              <span>Delete</span>
              <Trash className="text-destructive ml-auto" size={18} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <SheetHoc
              trigger={
                <Button variant="ghost" className="w-full px-2 md:px-2">
                  <div className="w-full flex items-center gap-2 justify-between">
                    <span className="font-normal">Edit</span>
                    <Pencil size={18} className="text-primary" />
                  </div>
                </Button>
              }
            >
              <UserCreateForm defaultData={row.original} />{' '}
            </SheetHoc>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
