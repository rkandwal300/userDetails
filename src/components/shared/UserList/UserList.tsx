 
import { DataTable } from '../DataTable';
import { columns } from './column';
import { useGetAllUsers } from '@/lib/customHook/useGetHook';
import { Loader } from 'lucide-react';
 

export default function UserList() {
  const {data:users, isLoading} = useGetAllUsers();
  if(isLoading) return <Loader size={32} className="animate-spin" />;
  return <DataTable data={users} columns={columns} className={'p-4 md:p-6'} />;
}
