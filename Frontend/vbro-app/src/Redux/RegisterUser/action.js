import {
  USER_DATA_SENDING_FAILED,
  SEND_USER_DATA,
  USER_DATA_SENT,
  REGISTER_USER_SUCCESS
} from "./actionType";

import axiosInstance from "../axiosInstance";

const sendUserData = (payload) => {
  return {
    type: SEND_USER_DATA,
    payload: payload,
  };
};

const userDataSent = (payload) => {
  return {
    type: USER_DATA_SENT,
    payload: payload,
  };
};

const receiveRegisteredData = (payload) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: payload,
  };
};

const userDataSendFailed = (payload) => {
  return {
    type: USER_DATA_SENDING_FAILED,
    payload: payload,
  };
};

export const sendRegisterData = (payload) => (dispatch) => {
  console.log("u are in Account availabilty checking");
  dispatch(sendUserData(payload.data));
  return axiosInstance
    .post(`${process.env.REACT_APP_AUTH_HOST}/checkStatus`, {
      ...payload.data,
    })
    .then((res) => dispatch(userDataSent(res)))
    .then(() => {
        console.log("payload after /checkStatus post req", payload);
        payload.callback();
    })
    .catch((err) => dispatch(userDataSendFailed(err)));
};

export const registerUser = (payload) => (dispatch) => {
  console.log("u are in registration");
  dispatch(sendUserData(payload.data));
  return axiosInstance
    .post(`${process.env.REACT_APP_AUTH_HOST}/register`, {
      ...payload.data,
    })
    .then((res) => dispatch(receiveRegisteredData(res)))
    .then(() => {
        console.log("payload after /checkStatus post req", payload);
        payload.callback();
    })
    .catch((err) => dispatch(userDataSendFailed(err)));
};
