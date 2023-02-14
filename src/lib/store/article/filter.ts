import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckboxDataInterface {
  text: string;
  value: string;
}
interface InitialStateInterface {
  headline: string;
  pubDate: string;
  country: CheckboxDataInterface[];
}

const initialState: InitialStateInterface = {
  headline: '',
  pubDate: '',
  country: [],
};

export const articleFilter = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    setHeadline: (state, action: PayloadAction<string>) => {
      state.headline = action.payload;
    },
    setPubDate: (state, action: PayloadAction<string>) => {
      state.pubDate = action.payload;
    },
    setCountry: (state, action: PayloadAction<CheckboxDataInterface[]>) => {
      state.country = action.payload;
    },
  },
});

export const { setHeadline, setPubDate, setCountry } = articleFilter.actions;
export default articleFilter.reducer;
