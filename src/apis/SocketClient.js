import {io} from 'socket.io-client';
import {END_POINTS} from '../constants/endpoints';

export const socket = io(`${END_POINTS}/delivers`);
