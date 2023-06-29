  import { createSlice, PayloadAction } from '@reduxjs/toolkit'
  import { User } from './types'

  interface AuthState {
    isAuthenticated: boolean
    user: User | null
  }

  const initialState: AuthState = {
    isAuthenticated: false,
    user:  {
      id: "",
      email: "",
      lastName: "",
      firstName: "",
      role: "",
      avatar: "",
      phoneNumber: "",
      accessToken: "",
      refreshToken: ""
    }
  }

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login(state, action: PayloadAction<User>) {
        state.isAuthenticated = true
        state.user = action.payload
      },
      editUser(state, action: PayloadAction<Partial<User>>) {
        state.isAuthenticated = true
        state.user = {
          ...state.user,
          ...action.payload
        }
      },
      logout(state) {
        state.isAuthenticated = false
        state.user = null
      }
    }
  })

  export const { login, logout, editUser} = authSlice.actions

  export default authSlice.reducer



  