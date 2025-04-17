import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  role: z.enum(['admin', 'user']),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
});
export type UserType = z.infer<typeof UserSchema>;
