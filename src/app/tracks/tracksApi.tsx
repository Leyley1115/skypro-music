import { TrackType } from '@/src/sharedTypes/sharedTypes';
import { BASE_URL } from '../services/constants';
import axios from 'axios';

const getAuthHeaders = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const getAllTracks = (): Promise<TrackType[]> => {
  const url = BASE_URL + '/catalog/track/all/';
  return axios
    .get(url, { headers: getAuthHeaders() })
    .then((res) => res.data.data);
};

export const getSelection = (selectionId: number): Promise<any> => {
  const url = BASE_URL + `/catalog/selection/${selectionId}/`;
  return axios
    .get(url, { headers: getAuthHeaders() })
    .then((res) => res.data.data ?? res.data);
};

export const getTracksByIds = (ids: number[]): Promise<TrackType[]> => {
  return getAllTracks().then((tracks) =>
    tracks.filter((track) => ids.includes(track._id)),
  );
};
