 
import { FieldValues } from 'react-hook-form';
import { FallbackErrorMessages, RestMethod } from './network.enum';

export async function handleSuccessResponse<T>(response: Response): Promise<T> {
  if (response.status === 200 || response.status === 201) {
    return (await response.json()) as T;
  }
  return {} as T;
}

export function handleErrorResponse<T>(error: Error, method: RestMethod) {
  let message: string = FallbackErrorMessages[method];

  if (error?.message) {
    message = Array.isArray(error.message)
      ? error.message.join(', ')
      : error.message;
  }

 
  return {
    success: false,
    data: {} as T,
    message: message,
    error: (typeof error === 'string'
      ? JSON.parse(JSON.stringify(error))
      : error) as FieldValues,
  };
}
