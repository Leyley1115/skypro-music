import { TrackType } from '@/src/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  isShuffle: boolean;
  playlist: TrackType[];
  shufflePlaylist: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  playlist: [],
  shufflePlaylist: [],
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
      state.shufflePlaylist = [...state.playlist].sort(() => Math.random()-0.5);
    },
    setIsPLay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle ? state.shufflePlaylist : state.playlist;

      if (state.currentTrack){
        const curIndex = playlist.findIndex((el) => el._id === state.currentTrack?._id)
        const nexIndex = curIndex + 1;
        state.currentTrack = playlist[nexIndex] || playlist[0];
      };
    },
    toogleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle ? state.shufflePlaylist : state.playlist;
      if (state.currentTrack){
        const curIndex = playlist.findIndex((el) => el._id === state.currentTrack?._id)
        const prevIndex = curIndex - 1;
        state.currentTrack = playlist[prevIndex] || playlist[state.playlist.length - 1];
      }
    }
  },
});

export const { setCurrentTrack, setIsPLay, setCurrentPlaylist, setNextTrack, setPrevTrack, toogleShuffle } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
