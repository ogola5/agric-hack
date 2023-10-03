import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import claimService from './claimService'

const initialState = {
  claims: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user claims
export const getclaims = createAsyncThunk(
  'claims/getAll',
  async (_, thunkAPI) => {
    try {
     
      return await claimService.getclaims()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const addclaim = createAsyncThunk(
  'claims/create',
  async (claimData, thunkAPI) => {
    try {
      return await claimService.addclaim(claimData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const claimSlice = createSlice({
  name: 'claim',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getclaims.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getclaims.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.claims = action.payload
      })
      .addCase(getclaims.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addclaim.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addclaim.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.claims.push(action.payload)
        
      })
      .addCase(addclaim.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
  },
})

export const { reset } = claimSlice.actions
export default claimSlice.reducer
