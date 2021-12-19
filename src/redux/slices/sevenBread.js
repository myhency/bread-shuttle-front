import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  deleteResult: '',
  sevenBreadItems: [],
  sevenBreadAdminItems: [],
  sevenBreadAdminItemByItemCode: {
    itemCode: '',
    itemName: '',
    majorHandler: '',
    capturedDate: '',
    reOccurDateList: []
  },
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

    // GET SEVEN BREAD ADMIN ITEMS
    getSevenBreadAdminItemsSuccess(state, action) {
      state.isLoading = false;
      state.sevenBreadAdminItems = action.payload;
    },

    getDeleteSevenBreadItemSuccess(state, action) {
      state.isLoading = false;
      state.deleteResult = action.payload;
    },

    getSevenBreadAdminItemByItemCodeSuccess(state, action) {
      state.isLoading = false;
      state.sevenBreadAdminItemByItemCode = action.payload;
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

export function createSevenBreadItem({ itemCode, capturedDate, majorHandler, reoccurDateList }) {
  // console.log(reoccurDateList);
  if (reoccurDateList) {
    return axios.put(`/api/v1/platform/v2/sevenbread/item/trace`, {
      itemCode,
      reoccurDateList
    });
  }

  return axios.post('/api/v1/platform/v2/sevenbread/item', {
    itemCode,
    capturedDate,
    majorHandler
  });
}

export function fetchSevenBreadItems() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/platform/v2/sevenbread/item');
      console.log('seven');
      dispatch(slice.actions.getSevenBreadAdminItemsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function fetchSevenBreadItemByItemCode(itemCode) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/platform/v2/sevenbread/item/${itemCode}`);
      dispatch(slice.actions.getSevenBreadAdminItemByItemCodeSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteSevenBreadItemForArchive(itemCode, date, type) {
  console.log(itemCode, date, type);
  const URL =
    type !== 'win' ? '/api/v1/platform/v2/sevenbread/item/archive' : '/api/v1/platform/v2/sevenbread/item/win';
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(URL, {
        itemCode,
        deletedDate: date,
        type
      });
      console.log(response);
      dispatch(slice.actions.getDeleteSevenBreadItemSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
