import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  tradingVolumeItems: [],
  tradingVolumeDateList: [],
  tradingVolumeItemsByFilter: [],
  filterBy: 'itemName'
};

const slice = createSlice({
  name: 'tradingVolume',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET MANAGE TRADING VOLUME DATE ITEMS
    getTradingVolumeDateListSuccess(state, action) {
      state.isLoading = false;
      state.tradingVolumeDateList = action.payload;
    },

    // GET MANAGE TRADING VOLUME ITEMS
    getTradingVolumeListSuccess(state, action) {
      state.isLoading = false;
      state.tradingVolumeItems = action.payload;
    },

    // GET MANAGE TRADING VOLUME ITEMS BY FILTER
    getTradingVolumeListByFilterSuccess(state, action) {
      state.isLoading = false;
      state.tradingVolumeItemsByFilter = action.payload;
    },

    filterByCondition(state, action) {
      state.filterBy = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { filterByCondition } = slice.actions;

// ----------------------------------------------------------------------

export function fetchTradingVolumeDateList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/platform/analyze/volume/datelist');
      dispatch(slice.actions.getTradingVolumeDateListSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function fetchTradingVolumeList(date) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/platform/analyze/volume?date=${date}`);
      dispatch(slice.actions.getTradingVolumeListSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function fetchTradingVolumeListByFilter(by, filter) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/platform/analyze/volume/search?by=${by}&filter=${filter}`);
      dispatch(slice.actions.getTradingVolumeListByFilterSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------