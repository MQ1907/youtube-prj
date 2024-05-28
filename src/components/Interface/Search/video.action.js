import {
  SEARCH_VIDEOS_FAIL,
  SEARCH_VIDEOS_REQUEST,
  SEARCH_VIDEOS_SUCCESS,
} from "../Search/actionType.js";

import request from "../../../api.js";

export const getVideoBySearch = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCH_VIDEOS_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",

        maxResult: 20,
        q: keyword,
        type: "video,channel",
      },
    });
    dispatch({
      type: SEARCH_VIDEOS_SUCCESS,
      payload: data.items
    });
  } catch (error) {
    dispatch({
      type: SEARCH_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};
