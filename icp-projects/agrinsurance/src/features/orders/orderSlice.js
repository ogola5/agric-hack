import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user transactions
export const getorders = createAsyncThunk(
  'orders/getAll',
  async (_, thunkAPI) => {
    try {
     
      return await orderService.getorders()
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


export const addorder = createAsyncThunk(
  'orders/create',
  async (orderData, thunkAPI) => {
    try {
      return await orderService.addorder(orderData);
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
export const orderSlice = createSlice({
  name: 'order',
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
      .addCase(getorders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getorders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
      })
      .addCase(getorders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addorder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addorder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders.push(action.payload)
      })
      .addCase(addorder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
  },
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer
