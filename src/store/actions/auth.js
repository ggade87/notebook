import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
const liveUrl = "https://murmuring-castle-18009.herokuapp.com";
const localUrl = "http://localhost:8080";
const apiurl = localUrl;
const clientUrl = "/http://localhost:3000";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      name: "",
      email: email,
      password: password,
      profession: "",
    };
    let url = apiurl + "/rigisterUser";
    if (!isSignup) {
      url = apiurl + "/getUser";
    }

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(url, authData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.error && response.data.error.code > 0) {
          throw response.data.error;
        } else if (!response.data) {
          throw response.data.error;
        }
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", response.data[0]._id);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data[0]._id);
        dispatch(authSuccess(response.data[0]._id, response.data[0]._id));
        dispatch(checkAuthTimeout(3600));
        /*if (response.data.error && response.data.error.code > 0) {
          throw response.data.error;
        } else if (!response.data) {
          throw response.data.error;
        }
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", response.data.response[0].UsersId);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.response[0].UsersId);
        dispatch(
          authSuccess(
            response.data.response[0].UsersId,
            response.data.response[0].UsersId
          )
        );
        dispatch(checkAuthTimeout(3600));*/
      })
      .catch((err) => {
        if (err.code === 11000) {
          err.message = "Email already exits!";
        } else if (err.code === 1) {
          err.message = "Incorrect username & password!";
        }
        dispatch(authFail(err));
      });
    // const authData = {
    //   email: email,
    //   password: password,
    //   returnSecureToken: true,
    // };
    // let url =
    //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9nwEXu6fxAV9XwTmJOHt0Z9NwX20IC4Q";
    // if (!isSignup) {
    //   url =
    //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9nwEXu6fxAV9XwTmJOHt0Z9NwX20IC4Q";
    // }
    // axios
    //   .post(url, authData)
    //   .then((response) => {
    //     const expirationDate = new Date(
    //       new Date().getTime() + response.data.expiresIn * 1000
    //     );
    //     localStorage.setItem("token", response.data.idToken);
    //     localStorage.setItem("expirationDate", expirationDate);
    //     localStorage.setItem("userId", response.data.localId);
    //     dispatch(authSuccess(response.data.idToken, response.data.localId));
    //     dispatch(checkAuthTimeout(response.data.expiresIn));
    //   })
    //   .catch((err) => {
    //     dispatch(authFail(err.response.data.error));
    //   });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
