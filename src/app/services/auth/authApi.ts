import axios from 'axios';
import { BASE_URL } from '../constants';
import { AxiosResponse } from 'axios';

type authUserProps = {
  email: string;
  password: string;
};

type authUserReturn = {
  email: string;
  username: string;
  _id: number;
};

type authTokenResponse = {
  access: string;
  refresh: string;
};

type signUpUserProps = {
  email: string;
  password: string;
  username: string;
};

export const signUpUser = (
  data: signUpUserProps,
): Promise<AxiosResponse<authUserReturn>> => {
  return axios.post(BASE_URL + '/user/signup', data, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const authUser = (
  data: authUserProps,
): Promise<AxiosResponse<authTokenResponse>> => {
  return axios.post(BASE_URL + '/user/token/', data, {
    headers: { 'content-type': 'application/json' },
  });
};
