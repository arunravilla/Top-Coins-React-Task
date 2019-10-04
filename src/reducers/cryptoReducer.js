import {
  FETCH_LATEST_LISTING,
  FETCH_LATEST_LISTING_SUCCESS,
  FETCH_LATEST_LISTING_FAILURE,
  LIMIT_LATEST_LISTING
} from "../constants/actionTypes";
import { LISTING_LIMIT } from "../constants";

export default function cryptoReducer(
  state = {
    fetchingLatestListing: true,
    latestListing: [],
    listingLimit: LISTING_LIMIT
  },
  action
) {
  switch (action.type) {
    case FETCH_LATEST_LISTING:
      return {
        ...state,
        fetchingLatestListing: true
      };
    case FETCH_LATEST_LISTING_SUCCESS:
      return {
        ...state,
        fetchingLatestListing: false,
        latestListing: action.data
      };
    case FETCH_LATEST_LISTING_FAILURE:
      return { ...state, fetchingLatestListing: false, latestListing: [] };
    case LIMIT_LATEST_LISTING:
      return { ...state, listingLimit: action.listingLimit };
    default:
      return state;
  }
}
