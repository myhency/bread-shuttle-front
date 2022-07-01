import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: false,
  links: []
};

const slice = createSlice({
  name: 'link',
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

    // GET LINK LIST
    getLinkListSuccess(state, action) {
      state.isLoading = false;
      state.links = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

export function fetchLinks() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/platform/admin/link/all');
      dispatch(slice.actions.getLinkListSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateLink({ id, linkValue }) {
  return axios.put('/api/v1/platform/admin/link', { id, linkValue });
}
