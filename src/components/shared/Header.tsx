import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { SheetHoc } from './SheetHoc';
import UserCreateForm from './UserCreateForm';

export default function Header() {
  return (
    <div className="border-b flex justify-between items-center md:px-6 px-4 py-4 h-16">
      <p className="font-semibold text-lg">User</p>
      <SheetHoc
        trigger={
          <Button>
            <div className="flex items-center gap-1.5">
              Create
              <Plus size={16} />
            </div>
          </Button>
        }
      >
        <UserCreateForm />
      </SheetHoc>
    </div>
  );
}
