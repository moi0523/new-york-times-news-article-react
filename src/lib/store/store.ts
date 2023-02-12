import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistStore } from 'redux-persist';
import { scrapArticle } from './article/scrap';
import { tabArticle } from './article/tab';

const reducer = combineReducers({
  scrap: scrapArticle.reducer,
  tab: tabArticle.reducer,
});

export const store = configureStore({
  reducer,
});
// export const persistor = persistStore(store);
// export default { store, persistor };

export type ReducerType = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export default { store };
