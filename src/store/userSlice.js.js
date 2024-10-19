import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: '',
  fullName: '',
  idCard: '',
  phone: '',
  point: 0,
  orderCount: 0,
  statusShipper: true,
  avatar: '',
  email: '',
  location: {
    address: '',
    geometry: '',
  },
  gender: '',
  dateOfBirth: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPoint: (state, action) => {
      state.point = action.payload;
    },
    setOrderCount: (state, action) => {
      state.orderCount = action.payload;
    },
    setAddress: (state, action) => {
      state.location.address = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setStatusShipper: (state, action) => {
      state.statusShipper = action.payload;
    },
    setUserInfo: (state, action) => {
      return {...state, ...action.payload};
    },
  },
});

export const {
  setPoint,
  setOrderCount,
  setAddress,
  setLocation,
  setStatusShipper,
  setUserInfo,
} = userSlice.actions;

export const idSelector = state => state.user.id;

export default userSlice.reducer;
