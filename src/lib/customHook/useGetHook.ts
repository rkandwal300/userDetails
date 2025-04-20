'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUserAction,
  getAllUserListAction,
  getUserAction,
  updateUserAction,
  deleteUserAction,
} from '../api/user/user.api';  
import { UserType } from '@/lib/schema/user.schema';

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['GetAllUsers'],
    queryFn: () =>
      getAllUserListAction().then(res => res?.data ?? []),
    initialData: [],
  });
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ['GetUser', id],
    queryFn: () => getUserAction(id).then(res => res?.data),
    enabled: !!id, // avoids firing if id is undefined/null
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserType) => createUserAction(data),
    onSuccess: ({ data, message }) => {
      if (!data) throw new Error(message);
      queryClient.invalidateQueries(['GetAllUsers']);
      queryClient.invalidateQueries(['GetUser', data._id]);
    },
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserType) => updateUserAction(id, data),
    onSuccess: ({ data, message }) => {
      if (!data) throw new Error(message);
      queryClient.invalidateQueries(['GetAllUsers']);
      queryClient.invalidateQueries(['GetUser', data._id]);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUserAction(id),
    onSuccess: ({ data, message }) => {
      if (!data) throw new Error(message);
      queryClient.invalidateQueries(['GetAllUsers']);
    },
  });
};
