import { createSlice } from '@reduxjs/toolkit';

interface LoadState {
  isLoading: boolean;
}

const initialState: LoadState = {
  isLoading: false
};

const loadSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = true;
    },
    unsetLoading(state, action) {
      state.isLoading = false;
    },
  },
});

export const { setLoading, unsetLoading } = loadSlice.actions;

export default loadSlice.reducer;