import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserSchema, UserType } from '@/lib/schema/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { SheetClose } from '../ui/sheet';
import { useCreateUser, useUpdateUser } from '@/lib/customHook/useGetHook';
import { useRef } from 'react';
import { toast } from 'react-toastify';

type Props = Readonly<{
  defaultData?: UserType & { _id: string };
}>;

export default function UserCreateForm({ defaultData }: Props) {
  const SheetCloseRef = useRef<HTMLButtonElement>(null)
  const createUser = useCreateUser();
  const updateUSer = useUpdateUser(String(defaultData?._id));

  const form = useForm<UserType>({
    resolver: zodResolver(UserSchema),
    defaultValues: defaultData? {
      name: defaultData?.name,
      email: defaultData?.email,
      phone: defaultData?.phone,
      address: defaultData?.address,
      city: defaultData?.city,
      country: defaultData?.country,
      role: defaultData?.role,
      postalCode: defaultData?.postalCode,
    
    } : {},
  });
  function onSubmit(values: UserType) {
    if (defaultData) {
         
      updateUSer.mutate(values, {
        onSuccess: () => {
          form.reset();
          SheetCloseRef.current?.click();
          toast.success('User updated successfully', {
            position: 'top-right',
            autoClose: 3000,
          });
        },
        onError: () => {
          toast.error("failed to update user", {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      });
    } else {
      createUser.mutate(values, {
        onSuccess: () => {
          form.reset();
          SheetCloseRef.current?.click();
          toast.success('User created successfully', {
            position: 'top-right',
            autoClose: 3000,
          });
        },
        onError: () => {
          toast.error("failed to create user", {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      });
    }

  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 ">
        <div className="px-6 h-16 py-4 border-b flex justify-between items-center bg-background sticky z-20">
          <span className="font-semibold">{`${defaultData ? 'Update' : 'Create'
            } User`}</span>
          <div
            className="flex items-center gap-2
        "
          >
            <SheetClose
              className={buttonVariants({
                variant: 'outline',
              })}
            >
              <button
                ref={SheetCloseRef}
              >
                <span className="sr-only">Close</span>
                <X size={18} />

              </button>
            </SheetClose>
            <Button type="submit">Save</Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
