import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const OrganisationSettingsSlice = createSlice({
  name: 'organisationSettings',
  initialState: {
    logo:"Logo"
  },

  reducers: {
    setLogo: (state, action) => {       
      state.logo = action.payload;
    },
    
  },

  
  })



export const { setLogo } = OrganisationSettingsSlice.actions;

export default OrganisationSettingsSlice.reducer;
