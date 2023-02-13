import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProcessedArticleData } from '../../helper/processedArticle';

interface InitialStateInterface {
  list: ProcessedArticleData[];
  page: number;
}

const initialState: InitialStateInterface = {
  list: [],
  page: 0,
};

export const articleList = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    addArticleList: (state, action: PayloadAction<ProcessedArticleData[]>) => {
      const list = action.payload;

      console.log('list', list);

      state.list = [...state.list, ...list];
    },
    addArticlePage: (state) => {
      state.page += 1;
    },
  },
});

export const { addArticleList, addArticlePage } = articleList.actions;
export default articleList.reducer;
