import {
  LISTING_DATA_FAILED,
  LISTING_DATA_SEND,
  LISTING_DATA_SUCCESS,
} from "./actionTypes";

import axiosInstance from "../axiosInstance";

const sendListingData = (payload) => {
  return {
    type: LISTING_DATA_SEND,
    payload: payload,
  };
};

const listingDataSuccess = (payload) => {
  return {
    type: LISTING_DATA_SUCCESS,
    payload: payload,
  };
};

const listingDataSendFailed = (payload) => {
  return {
    type: LISTING_DATA_FAILED,
    payload: payload,
  };
};

export const getListData = (payload) => (dispatch) => {
  dispatch(sendListingData(payload));
  let {url, params} = payload;

  return axiosInstance
    .get(
      url,
      {
        params: params
      },
    )
    .then((res) => {
		console.log(res);
      return res.data;
    })
    .then((res) => {
      dispatch(listingDataSuccess(res));
    })
    .catch((err) => dispatch(listingDataSendFailed(err)))
};
