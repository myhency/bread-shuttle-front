import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import userReducer from './slices/user';
import linkReducer from './slices/link';
import sevenBreadReducer from './slices/sevenBread';
import stockItemReducer from './slices/stockItem';
import tradingVolumeReducer from './slices/tradingVolume';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const sevenBreadPersistConfig = {
  key: 'sevenBread',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy']
};

const rootReducer = combineReducers({
  user: userReducer,
  link: linkReducer,
  sevenBread: persistReducer(sevenBreadPersistConfig, sevenBreadReducer),
  stockItem: stockItemReducer,
  tradingVolume: tradingVolumeReducer
});

export { rootPersistConfig, rootReducer };
