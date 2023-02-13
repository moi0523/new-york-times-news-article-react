import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProcessedArticleData } from '../../helper/processedArticle';

interface InitialStateInterface {
  scrapArticle: ProcessedArticleData[];
}

const initialState: InitialStateInterface = {
  scrapArticle: [],
};

export const scrapArticle = createSlice({
  name: 'scrap',
  initialState,
  reducers: {
    addScrap(state, action: PayloadAction<ProcessedArticleData>) {
      const scrapArticle = action.payload;
      state.scrapArticle = [...state.scrapArticle, scrapArticle];
    },
    deleteScrap(state, action) {
      state.scrapArticle = state.scrapArticle.filter(
        (scrap) => scrap.headline !== action.payload.headline,
      );
    },
  },
});

export const { addScrap, deleteScrap } = scrapArticle.actions;
export default scrapArticle.reducer;
