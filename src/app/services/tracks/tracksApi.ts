import { BASE_URL } from '../constants';
import axios from 'axios';

export const addLike = (access: string, id: number) => {
  return axios.post(
    `${BASE_URL}/catalog/track/${id}/favorite/`,{}, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(BASE_URL + `/catalog/track/${id}/favorite/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};
