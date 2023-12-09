import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/orders/orderSlice'
import claimReducer from '../features/claims/claimSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    claims: claimReducer
  },
})
