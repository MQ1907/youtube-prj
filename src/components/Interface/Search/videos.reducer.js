import {
  SEARCH_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_FAIL,
  SEARCH_VIDEOS_REQUEST,
} from "../Search/actionType.js";

export const searchVideosReducer = (
  state = {
    videos: [],
    loading: true,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case SEARCH_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case SEARCH_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
