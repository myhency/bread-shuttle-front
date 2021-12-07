import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  sevenBreadItems: [],
  createResult: null,
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
    },

    filterSevenBreadItems(state, action) {
      state.filters.price = action.payload.price;
    },

    sortBySevenBreadItems(state, action) {
      state.sortBy = action.payload;
    },

    createSevenBreadItemSuccess(state, action) {
      state.isLoading = false;
      state.createResult = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { filterSevenBreadItems, sortBySevenBreadItems } = slice.actions;

// ----------------------------------------------------------------------

export function createSevenBreadItem({ itemCode, capturedDate, majorHandler }) {
  console.log(itemCode, capturedDate, majorHandler);
  // return async (dispatch) => {
  // dispatch(slice.actions.startLoading());
  // try {
  // const response = await axios.post('/api/v1/platform/v2/sevenbread/item', {
  //   itemCode,
  //   capturedDate,
  //   majorHandler
  // });
  // dispatch(slice.actions.createSevenBreadItemSuccess(response.data));
  return axios.post('/api/v1/platform/v2/sevenbread/item', {
    itemCode,
    capturedDate,
    majorHandler
  });

  // };
}
