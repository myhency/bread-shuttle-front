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
  themeCategoryByDate: [],
  themeCategoryByItemCodes: [],
  themeCategoryItemsByCategoryName: [],
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

    // GET MANAGE THEME CATEGORY DATA BY DATE
    getThemeCategoryByDateSuccess(state, action) {
      state.isLoading = false;
      state.themeCategoryByDate = action.payload;
    },

    getThemeCategoryItemsByCategoryNameSuccess(state, action) {
      state.isLoading = false;
      state.themeCategoryItemsByCategoryName = action.payload;
    },

    getThemeCategoryByItemCodesSuccess(state, action) {
      state.isLoading = false;
      state.themeCategoryByItemCodes = action.payload;
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

export function fetchThemeCategoryByDate(dateStr) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/platform/item/theme/category/${dateStr}`);
      if (response.status === 204) {
        dispatch(slice.actions.getThemeCategoryByDateSuccess(initialState.themeCategoryByDate));
      }
      dispatch(slice.actions.getThemeCategoryByDateSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function fetchThemeCategoryItemsByCategoryName(request) {
  const { categoryName, dateStr } = request;
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `/api/v1/platform/analyze/volume/category?categoryName=${categoryName}&dateStr=${dateStr}`
      );
      dispatch(slice.actions.getThemeCategoryItemsByCategoryNameSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function fetchThemeCategoryByItemCodes(itemCodes) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/v1/platform/item/theme/category/realtime', {
        itemCodes
      });
      console.log(response.data);
      if (response.status === 204) {
        dispatch(slice.actions.getThemeCategoryByItemCodesSuccess(initialState.themeCategoryByItemCodes));
      }
      dispatch(slice.actions.getThemeCategoryByItemCodesSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
