import {create} from 'zustand';

const useUserStore = create(set => ({
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
  setPoint: point => set(state => ({...state, point})),
  setOrderCount: orderCount => set(state => ({...state, orderCount})),
  setAddress: address =>
    set(state => ({...state, location: {...state.location, address}})),
  setLocation: location => set(state => ({...state, location})),
  setStatusShipper: statusShipper => set(state => ({...state, statusShipper})),
  setUserInfo: userData => set(state => ({...state, ...userData})),
}));

export default useUserStore;
