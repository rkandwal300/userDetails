/* eslint-disable react-refresh/only-export-components */
import { ColumnDef, Row } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { UserType } from '@/lib/schema/user.schema';
import { SheetHoc } from '../SheetHoc';
import UserCreateForm from '../UserCreateForm';
import { useDeleteUser } from '@/lib/customHook/useGetHook';
import { toast } from 'react-toastify';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandGroup } from '@/components/ui/command'; 

export const columns: ColumnDef<UserType & { _id: string }>[] = [
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
    header: () => "Phone",
    cell: ({ row }) => (
      <div className=" font-medium">{row.getValue('phone')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {

      return (
        <TableOptions {...row} />
      );
    },
  },
];


const TableOptions = (row: Row<UserType & { _id: string }>) => {
  const deleteUser = useDeleteUser()

  return (
    <Popover   >
      <PopoverTrigger asChild>
        <MoreHorizontal />

      </PopoverTrigger>
      <PopoverContent align="end" className='w-56 p-0 md:p-0'>
        <Command>
          <CommandGroup>
            <Button variant="ghost" className="w-full px-2 md:px-2"
              onClick={() => {
                deleteUser.mutate(row.original._id, {
                  onSuccess: () => {
                    toast.success("User is deleted"); 
                  },
                  onError: () => {
                    toast.error("User is not deleted")
                  }
                })



              }}
            >
              <div className="w-full flex items-center gap-2 justify-between">
                <span>Delete</span>
                <Trash className="text-destructive ml-auto" size={18} />
              </div>

            </Button>

            <SheetHoc
              trigger={
                <Button variant="ghost" className="w-full px-2 md:px-2">
                  <div className="w-full flex items-center gap-2 justify-between">
                    <span  >Edit</span>
                    <Pencil size={18} className="text-primary" />
                  </div>
                </Button>
              }
            >
              <UserCreateForm defaultData={row.original} />{' '}
            </SheetHoc>
          </CommandGroup>

        </Command>



      </PopoverContent>
    </Popover>
  );
}