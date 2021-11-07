import { sum, map, filter, uniqBy, reject } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import useFirebaseRealtime from '../../hooks/useFirebase';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  sevenBreadItems: [],
  sortBy: 'earningRateDesc',
  filters: {
    price: '현재가 > 기관매수가'
  }
};

const slice = createSlice({
  name: 'sevenBread',
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

    // GET SEVEN BREAD ITEMS
    getSevenBreadItemsSuccess(state, action) {
      state.isLoading = false;
      state.sevenBreadItems = action.payload;
    },

    filterSevenBreadItems(state, action) {
      state.filters.price = action.payload.price;
    },

    sortBySevenBreadItems(state, action) {
      state.sortBy = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { filterSevenBreadItems, sortBySevenBreadItems } = slice.actions;
