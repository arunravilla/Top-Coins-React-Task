import {
  FETCH_LATEST_LISTING,
  FETCH_LATEST_LISTING_SUCCESS,
  FETCH_LATEST_LISTING_FAILURE,
  LIMIT_LATEST_LISTING
} from "../constants/actionTypes";
import { API_ENDPOINT, API_KEY } from "../constants";

export function fetchLatestListing() {
  return async function(dispatch) {
    try {
      dispatch({
        type: FETCH_LATEST_LISTING
      });
      const response = await fetch(API_ENDPOINT, {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
          contentType: "application/json"
        }
      });
      const data = await response.json();
      return dispatch({
        type: FETCH_LATEST_LISTING_SUCCESS,
        data: data.data ? data.data : []
      });
    } catch (err) {
      return dispatch({
        type: FETCH_LATEST_LISTING_FAILURE
      });
    }
  };
}

export function limitLatestListing(listingLimit) {
  return function(dispatch) {
    return dispatch({
      type: LIMIT_LATEST_LISTING,
      listingLimit
    });
  };
}
