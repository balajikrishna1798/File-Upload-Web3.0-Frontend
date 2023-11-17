import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const MetaMaskSlice = createSlice({
  name: 'metaMask',
  initialState: {
    account:""
  },

  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    
  },

  
  })



export const { setAccount } = MetaMaskSlice.actions;

export default MetaMaskSlice.reducer;
