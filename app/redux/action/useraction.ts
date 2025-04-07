import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define the expected response structure
interface GetAllUserResponse {
  total: number;
  currentPage: number;
  totalPages: number;
  Users: any[];
}

// Thunk to get all users
export const getAllUser = createAsyncThunk<
  GetAllUserResponse, // ✅ Just the data, not AxiosResponse
  string, // query string input
  { rejectValue: any }
>('User/getAll', async (query, { rejectWithValue }) => {
  try {
    const response = await apiCall<GetAllUserResponse>(
      'GET',
      `api/approver/all-approver?${query}`
    );
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch Users');
  }
});
