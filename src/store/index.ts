import { configureStore } from "@reduxjs/toolkit";
import reduxPromise from "redux-promise";
import logger from "redux-logger";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import merge from "deepmerge";

import persistedReducer from "./reducers";

// const logger = (store) => (next) => (action) => {
//   console.log('[Middleware] Dispatching: ', action);
//   const result = next(action); // eslint-disable-line
//   console.log('[Middleware] Next state: ', store.getState());
//   return result;
// };

declare global {
  interface Window {
    REDUX_DATA: {
      [key: string]:
        | string
        | number
        | Record<string, unknown>
        | Record<string, unknown>[];
    };
  }
}

const configureStorePersisted = () => {
  const userStorage = localStorage.getItem("user");
  const user = userStorage ? JSON.parse(userStorage) : null;

  const preloadedState = window.REDUX_DATA;
  let initialState;

  if (user !== null && user !== undefined && user) {
    const expired =
      Date.now() > user.startTime + (user.expiryToken + 1.5) * 1000;
    // 1.5 delay for refresh token update on access token
    initialState = merge(preloadedState, {
      auth: {
        authenticated: expired ? "" : user.accessToken,
        errorMessageSignUp: "",
        errorMessageSignIn: "",
        expiry: { expiryToken: user.expiryToken, startTime: user.startTime },
      },
    });

    initialState = merge(initialState, {
      users: {
        userData: user.userData,
        error: user.error,
        currentUser: user.currentUser,
      },
    });
  } else {
    initialState = preloadedState;
  }

  return configureStore({
    reducer: persistedReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .prepend(reduxPromise)
        .concat(logger),
  });
};

const store = configureStorePersisted();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default { store, persistor };
