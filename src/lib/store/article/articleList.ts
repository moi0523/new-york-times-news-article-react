import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProcessedArticleData } from '../../helper/processedArticle';

interface InitialStateInterface {
  list: ProcessedArticleData[];
  page?: number;
}

const initialState: InitialStateInterface = {
  list: [],
  page: 0,
};

export const articleList = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    loadArticle: (state, action: PayloadAction<InitialStateInterface>) => {
      const { list } = action.payload;

      state.list = list;
    },
    loadMoreArticle: (state) => {
      // const getNewsArticle = getNewsArticleList({
      //   page: state.page || 0,
      // });
      // getNewsArticle.then((data) => {
      //   console.log('res', data.response);
      //
      //   const { docs: articles } = data.response;
      //
      //   state.list = [...state.list, ...processedArticle(articles)];
      //
      //   if (state.page) {
      //     state.page += 1;
      //   } else {
      //     state.page = 0;
      //   }
      // });
    },
  },
});

export const { loadArticle, loadMoreArticle } = articleList.actions;
export default articleList.reducer;
