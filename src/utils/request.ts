import type { ApiResponse } from '../types/common';

interface RequestOptions extends RequestInit {
  baseURL?: string;
  timeout?: number;
}

const DEFAULT_OPTIONS: RequestOptions = {
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

class RequestError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'RequestError';
  }
}

export async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const { baseURL, timeout, ...fetchOptions } = mergedOptions;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(`${baseURL}${url}`, {
      ...fetchOptions,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new RequestError(response.status, response.statusText);
    }
    
    const data: ApiResponse<T> = await response.json();
    
    if (data.code !== 0) {
      throw new Error(data.message);
    }
    
    return data.data;
  } catch (error) {
    if (error instanceof RequestError) {
      throw error;
    }
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
    throw new Error('Unknown error');
  }
}

export const http = {
  get: <T>(url: string, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'GET' }),
    
  post: <T>(url: string, data?: any, options?: RequestOptions) =>
    request<T>(url, { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
  put: <T>(url: string, data?: any, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    
  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: 'DELETE' })
}; 