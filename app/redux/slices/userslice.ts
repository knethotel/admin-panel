import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { getAllUser } from '../action/useraction';



interface UserState {
  loading: boolean;

  User: any[];
  selectedUser: any | null;
  totalUser: number;

  error: string | null;
  currentPage: number;
  
  totalPages: number;
  IsActive: boolean;
}

const initialState: UserState = {
  loading: false,

  User:[],
  selectedUser: null,
  totalUser: 0,
  
  error: null,
  currentPage: 1,
  
  totalPages: 0,
  IsActive: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<any>) {
      state.currentPage = action.payload; // Update currentPage in state
    },
  },
  extraReducers: (builder) => {
    builder

    //get all ApproverUser slice
    .addCase(getAllUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAllUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      // console.log(action.payload);
      state.User = action.payload.data.approver;
      // console.log(state.cases);
      state.totalUser = action.payload.total;
      // console.log(state.totalCases);
      state.currentPage = action.payload.currentPage;
      // console.log(state.currentPage);
      state.totalPages = action.payload.totalPages;
      // console.log(state.totalPages);
    })
    .addCase(getAllUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    },
});

export const { setCurrentPage} = userSlice.actions;
export default userSlice.reducer;