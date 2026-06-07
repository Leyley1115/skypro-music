import { TrackType } from '@/src/sharedTypes/sharedTypes';
import { BASE_URL } from '../services/constants';
import axios from 'axios';

export const getAllTracks = (): Promise<TrackType[]> => {
  const url = BASE_URL + '/catalog/track/all/';
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  return axios.get(url, { headers }).then((res) => res.data.data);
};
