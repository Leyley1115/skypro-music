import { TrackType } from '@/src/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  isShuffle: boolean;
  allTracks: TrackType[];
  isRepeat: boolean;
  playlist: TrackType[];
  favoriteTracks: TrackType[];
  shufflePlaylist: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  allTracks: [],
  isRepeat: false,
  playlist: [],
  favoriteTracks: [],
  shufflePlaylist: [],
  fetchError: null,
  fetchIsLoading: true,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks:(state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shufflePlaylist = [...state.playlist].sort(() => Math.random()-0.5);
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
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
    toogleRepeat: (state) => {
      state.isRepeat = !state.isRepeat;
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
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks =[...state.favoriteTracks, action.payload];
    },
     removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter((track) => track._id !== action.payload._id);
    },
  },
});

export const { 
  setCurrentTrack, 
  setIsPLay, 
  setCurrentPlaylist, 
  setNextTrack, 
  setPrevTrack, 
  toogleShuffle,
  setFetchError,
  setFetchIsLoading,
  setAllTracks,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  toogleRepeat 
  } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
