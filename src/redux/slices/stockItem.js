import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: false,
  stockItemList: [],
  totalPages: 0,
  totalElements: 0
};

const slice = createSlice({
  name: 'stockItem',
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

    // GET MANAGE STOCK ITEMS
    getStockItemListSuccess(state, action) {
      state.isLoading = false;
      state.stockItemList = action.payload.content;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getStockItemList(rowsPerPage, page) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/platform/item/stockItem?size=${rowsPerPage}&page=${page}`);
      dispatch(slice.actions.getStockItemListSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------
