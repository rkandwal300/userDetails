 
import { FieldValues } from 'react-hook-form';

export function getApiBody(body?: FieldValues) {
  if (!body) return undefined;
  if (typeof body === 'string' || body instanceof FormData) {
    return body;
  }
  return JSON.stringify(body);
}

 
 
export async function constructHeaders( 
  headers?: HeadersInit
): Promise<HeadersInit> { 
 
 
  return {
    ...headers,
    'Content-Type': 'application/json'
  };
}

export const logApiCall = (
  status: 'start' | 'success' | 'failure',
  details: Record<string, unknown>,
) => {
  console.log(
    `------------------- ${status.toUpperCase()} API CALL -------------------`,
    details,
  );
};
