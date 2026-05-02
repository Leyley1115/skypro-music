import { TrackType } from '@/src/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  playlist: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
    },
    setIsPLay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setNextTrack: (state) => {
      if (state.currentTrack){
        const curIndex = state.playlist.findIndex((el) => el._id === state.currentTrack?._id)
        const nexIndex = curIndex + 1;
        state.currentTrack = state.playlist[nexIndex] || state.playlist[0];
      };
    },
    setPrevTrack: (state) => {
      if (state.currentTrack){
        const curIndex = state.playlist.findIndex((el) => el._id === state.currentTrack?._id)
        const prevIndex = curIndex - 1;
        state.currentTrack = state.playlist[prevIndex] || state.playlist[state.playlist.length - 1];
      }
    }
  },
});

export const { setCurrentTrack, setIsPLay, setCurrentPlaylist, setNextTrack, setPrevTrack } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
