import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import scrapArticleReducer from './article/scrap';
import tabArticleReducer from './article/tab';
import articleListReducer from './article/articleList';
import articleFilterReducer from './article/filter';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['scrap'],
};

const reducer = combineReducers({
  scrap: scrapArticleReducer,
  tab: tabArticleReducer,
  articleList: articleListReducer,
  articleFilter: articleFilterReducer,
});

const setPersistReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: setPersistReducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export { reducer };
export default { store };
