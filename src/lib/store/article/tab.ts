import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedUnion = 'home' | 'scrap';

interface InitialStateInterface {
  selectedTab: SelectedUnion;
}

const initialState: InitialStateInterface = {
  selectedTab: window.location.pathname.indexOf('scrap') === -1 ? 'home' : 'scrap',
};

export const tabArticle = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<InitialStateInterface>) => {
      const { selectedTab } = action.payload;
      state.selectedTab = selectedTab;
    },
  },
});

export type { SelectedUnion };
export const { changeTab } = tabArticle.actions;
export default tabArticle.reducer;
