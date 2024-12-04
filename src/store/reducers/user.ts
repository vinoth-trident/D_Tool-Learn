import { createSlice } from "@reduxjs/toolkit";

export type IUserSlice = {
  isLoggedIn: boolean | null;
  masterData: any;
  accessToken: string | null;
  roles: any;
  userData: any | null;
};

const initialState: IUserSlice = {
  isLoggedIn: null,
  masterData: null,
  accessToken: null,
  roles: null,
  userData: null,
};

const userSlicer = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
        console.log("setIsLogin",action)
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLogin } = userSlicer.actions;

export default userSlicer.reducer;
