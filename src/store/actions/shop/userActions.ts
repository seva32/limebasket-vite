// import Axios from 'axios';
// import { useCookies } from 'react-cookie';
// import {
//   USER_SIGNIN_REQUEST,
//   USER_SIGNIN_SUCCESS,
//   USER_SIGNIN_FAIL,
//   USER_REGISTER_REQUEST,
//   USER_REGISTER_SUCCESS,
//   USER_REGISTER_FAIL,
//   USER_LOGOUT,
//   USER_UPDATE_REQUEST,
//   USER_UPDATE_SUCCESS,
//   USER_UPDATE_FAIL,
// } from './shopActionTypes/userActionTypes';
// import authHeader from '../../../utils/authHeaders/auth-header';

// // eslint-disable-next-line object-curly-newline
// export const update = ({ userId, name, email, password }) => async (
//   dispatch,
//   getState,
// ) => {
//   // eslint-disable-next-line no-unused-vars
//   const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
//   dispatch({
//     type: USER_UPDATE_REQUEST,
//     payload: {
//       userId,
//       name,
//       email,
//       password,
//     },
//   });
//   try {
//     const { data } = await Axios.put(
//       `/shop/users/${userId}`,
//       { name, email, password },
//       {
//         headers: authHeader(),
//       },
//     );
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//     setCookie('userInfo', JSON.stringify(data), {
//       path: '/',
//       sameSite: 'strict',
//     });
//   } catch (error) {
//     dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
//   }
// };

// export const login = (email, password) => async (dispatch, getState) => {
//   // eslint-disable-next-line no-unused-vars
//   const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
//   dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
//   try {
//     const { data } = await Axios.post(
//       '/shop/users/signin',
//       { email, password },
//       {
//         headers: authHeader(),
//       },
//     );
//     dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
//     setCookie('userInfo', JSON.stringify(data), {
//       path: '/',
//       sameSite: 'strict',
//     });
//   } catch (error) {
//     dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
//   }
// };

// export const register = (name, email, password) => async (dispatch) => {
//   // eslint-disable-next-line no-unused-vars
//   const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
//   dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
//   try {
//     const { data } = await Axios.post('/shop/users/register', {
//       name,
//       email,
//       password,
//     });
//     dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
//     setCookie('userInfo', JSON.stringify(data), {
//       path: '/',
//       sameSite: 'strict',
//     });
//   } catch (error) {
//     dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
//   }
// };

// export const logout = () => (dispatch) => {
//   // eslint-disable-next-line no-unused-vars
//   const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
//   removeCookie('userInfo');
//   dispatch({ type: USER_LOGOUT });
// };
