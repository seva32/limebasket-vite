/* eslint-disable react/destructuring-assignment */
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppDispatch as useDispatch } from "../../store/hooks";
// import {
//   signout,
//   refreshToken,
//   resfreshTokenRestartTimeout,
// } from "../../store/actions";

export default function useCountdown() {
  const timerRef = useRef<NodeJS.Timeout>();
  const timeRemainingUntilLogout = useRef<number>(0);
  const timeoutRunning = useRef<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const auth = useSelector(getAuth);
  const authFake = {
    authenticated: false,
    expiry: {
      expiryToken: 2,
      startTime: Date.now() - 1000,
    },
  };

  useEffect(() => {
    const expiry = authFake.expiry.expiryToken * 10000; // llega en segundos
    const startTime = authFake.expiry.startTime; // llega en milisegundos
    const auth = authFake.authenticated;

    // send action and update component store
    function resetCountdown() {
      // dispatch(resfreshTokenRestartTimeout());
    }

    function clearTimeoutFunc() {
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    function logout() {
      // this check is for the case when user signed out
      // to stop refresh token process
      if (!(auth !== null && auth !== undefined && auth)) {
        console.log("clear to func");

        clearTimeoutFunc();
      } else {
        console.log("logout");

        // dispatch(refreshToken((success) => {
        //   if (!success) {
        //     dispatch(signout(() => {
        //       navigate("/signin");
        //     }));
        //   } else {
        //     resetCountdown();
        //   }
        // }));
      }
    }

    function setTimeoutRun() {
      if (
        timeRemainingUntilLogout.current &&
        timeRemainingUntilLogout.current > 0
      ) {
        // flag a STO running
        timeoutRunning.current = true;
        timerRef.current = setTimeout(logout, timeRemainingUntilLogout.current);
      }
    }

    function startCountdown() {
      if (auth !== null && auth !== undefined && auth) {
        // check time from actual singin session
        const timeFromLogin = Date.now() - startTime;
        // private prop, useless in state and accesible from STO func
        timeRemainingUntilLogout.current = expiry - timeFromLogin;
        // check if there is a timeout already running from previous store change
        // if true invalidate the STO and start with the last component update
        if (timeoutRunning.current) {
          clearTimeoutFunc();
          timeoutRunning.current = false;
        }
        // timeRemainingUntilLogout is < when component updates and
        // refresh token process doesnt updated the store yet
        if (timeRemainingUntilLogout.current > 0) {
          setTimeoutRun();
        }
      }
    }

    startCountdown();
  });
}

// ComposedComponent.defaultProps = {
//   auth: "",
//   startTime: null,
//   expiry: null,
//   signout: () => {},
//   refreshToken: () => {},
//   resfreshTokenRestartTimeout: () => {},
// };

// function mapStateToProps({ auth }) {
//   return {
//     expiry: auth.expiry.expiryToken * 1000, // llega en segundos
//     startTime: auth.expiry.startTime, // llega en milisegundos
//     auth: auth.authenticated,
//   };
// }

// opcion a withRouter
// import { useHistory } from "react-router-dom";

// function HomeButton() {
//   let history = useHistory();

//   function handleClick() {
//     history.push("/home");
//   }

//   return (
//     <button type="button" onClick={handleClick}>
//       Go home
//     </button>
//   );
// }
