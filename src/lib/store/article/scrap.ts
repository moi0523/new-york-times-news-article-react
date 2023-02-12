import { createSlice } from '@reduxjs/toolkit';
import { ArticleProps } from '../../component/molecules/article';

interface InitialStateInterface {
  scrapArticle: ArticleProps[];
}

const initialState: InitialStateInterface = {
  scrapArticle: [],
};

export const scrapArticle = createSlice({
  name: 'scrap',
  initialState,
  reducers: {
    addScrap(state, action) {
      state.scrapArticle = action.payload.data;

      const scrap = action.payload;
      state.scrapArticle.push(scrap);
    },
    deleteScrap(state, action) {
      state.scrapArticle = state.scrapArticle.filter((scrap) => scrap.id !== action.payload.id);
    },
    getScrap(state, action) {
      state.scrapArticle = action.payload.data;
    },
  },
});

export const { addScrap, deleteScrap, getScrap } = scrapArticle.actions;
export default scrapArticle.reducer;
