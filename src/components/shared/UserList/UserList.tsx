import { UserType } from '@/lib/schema/user.schema';
import { DataTable } from '../DataTable';
import { columns } from './column';

const users: UserType[] = [
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'admin',
    phone: '+1-202-555-0132',
    address: '123 Maple Street',
    city: 'New York',
    country: 'USA',
    postalCode: '10001',
  },
  {
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    role: 'user',
    phone: '+1-303-555-0198',
    address: '456 Oak Avenue',
    city: 'Los Angeles',
    country: 'USA',
    postalCode: '90001',
  },
  {
    name: 'Clara Evans',
    email: 'clara.evans@example.com',
    role: 'user',
  },
  {
    name: 'Daniel Lee',
    email: 'daniel.lee@example.com',
    role: 'admin',
    phone: '+44-20-7946-0958',
    address: '78 Abbey Road',
    city: 'London',
    country: 'UK',
    postalCode: 'NW8 9AY',
  },
  {
    name: 'Esha Patel',
    email: 'esha.patel@example.com',
    role: 'user',
    phone: '+91-9876543210',
    address: '12 MG Road',
    city: 'Mumbai',
    country: 'India',
    postalCode: '400001',
  },
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'admin',
    phone: '+1-202-555-0132',
    address: '123 Maple Street',
    city: 'New York',
    country: 'USA',
    postalCode: '10001',
  },
  {
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    role: 'user',
    phone: '+1-303-555-0198',
    address: '456 Oak Avenue',
    city: 'Los Angeles',
    country: 'USA',
    postalCode: '90001',
  },
  {
    name: 'Clara Evans',
    email: 'clara.evans@example.com',
    role: 'user',
    // optional fields omitted
  },
  {
    name: 'Daniel Lee',
    email: 'daniel.lee@example.com',
    role: 'admin',
    phone: '+44-20-7946-0958',
    address: '78 Abbey Road',
    city: 'London',
    country: 'UK',
    postalCode: 'NW8 9AY',
  },
  {
    name: 'Esha Patel',
    email: 'esha.patel@example.com',
    role: 'user',
    phone: '+91-9876543210',
    address: '12 MG Road',
    city: 'Mumbai',
    country: 'India',
    postalCode: '400001',
  },
];

export default function UserList() {
  return <DataTable data={users} columns={columns} className={'p-4 md:p-6'} />;
}
