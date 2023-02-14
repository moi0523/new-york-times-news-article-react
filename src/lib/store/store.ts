import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistStore } from 'redux-persist';
import scrapArticleReducer from './article/scrap';
import tabArticleReducer from './article/tab';
import articleListReducer from './article/articleList';
import articleFilterReducer from './article/filter';

const reducer = combineReducers({
  scrap: scrapArticleReducer,
  tab: tabArticleReducer,
  articleList: articleListReducer,
  articleFilter: articleFilterReducer,
});

export const store = configureStore({
  reducer,
});
// export const persistor = persistStore(store);
// export default { store, persistor };

export type ReducerType = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export { reducer };
export default { store };
