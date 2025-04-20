import { FieldValues } from 'react-hook-form';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from './handleApiResponse';
import { RestMethod } from './network.enum';
import { constructHeaders, getApiBody, logApiCall } from './network.utils';

export type TReturnType<T> = {
  success: boolean;
  data: T;
  message?: string;
  error?: FieldValues;
};

type Props = {
  baseUrl?: string;
  path: string;
  method: RestMethod;
  queryParams?: FieldValues;
  body?: FieldValues;
  options?: RequestInit;
  headers?: HeadersInit;
};

export async function makeApiCall<T>({
  baseUrl,
  path,
  queryParams,
  method,
  body,
  options,
  headers,
}: Props): Promise<TReturnType<T>> {
  try {
    const url = new URL(
      [baseUrl ?? import.meta.env.VITE_BACKEND_URL, path].join('/'),
    );

    if (queryParams) {
      url.search = new URLSearchParams(queryParams).toString();
    }

    const _headers = await constructHeaders(headers);

    const _body = getApiBody(body);

    logApiCall('start', {
      url: url.toString(),
      method,
      headers: _headers,
      body: _body,
    });

    const response = await fetch(url.toString(), {
      ...options,
      method,
      headers: _headers,
      body: _body,
    });

    if (!response.ok) {
      throw await response.json();
    }

    const data = await handleSuccessResponse<T>(response);

    logApiCall('success', {
      url: url.toString(),
      method,
      headers,
      response: data,
    });

    return { success: true, data, message: 'Success', error: {} };
  } catch (error) { 
    logApiCall('failure', {
      url: path,
      method,
      headers,
      body: body ? JSON.stringify(error) : undefined,
      error,
    });

    return handleErrorResponse<T>(error as Error, method);
  }
}
