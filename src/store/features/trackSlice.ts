import { TrackType } from '@/src/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPLay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
  },
});

export const { setCurrentTrack, setIsPLay } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
