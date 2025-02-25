import apiCall from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';


// --------user ---------------------

// Action to get all user with pagination and filters support
export const getAllUser = createAsyncThunk<
  AxiosResponse<{
    total: number;
    currentPage: number;
    totalPages: number;
    Users: any[];
  }>, // Return type
  string, // Input type with filters
  { rejectValue: any }
>('User/getAll', 
  async (query , { rejectWithValue }) => {
  try {
    const response = await apiCall(
      'GET',
      `api/approver/all-approver?${query}`
    );
    return response; // Return full response 
  } catch (error: any) {
    return rejectWithValue(error || 'Failed to fetch Users');
  }
});
