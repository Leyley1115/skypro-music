import axios from 'axios';
import { BASE_URL } from '../constants';
import { AxiosResponse } from 'axios';

type accessTokenType = {
  access: string;
};

type refreshTokenType = {
  refresh: string;
};

type tokensType = accessTokenType & refreshTokenType;

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

export const signUpUser = (data: signUpUserProps,): Promise<AxiosResponse<authUserReturn>> => {
  return axios.post(BASE_URL + '/user/signup', data, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const authUser = (data: authUserProps,): Promise<AxiosResponse<authTokenResponse>> => {
  return axios.post(BASE_URL + '/user/login/', data);
};

export const logout = (): void => {
  localStorage.removeItem('token');
}

export const getToken = (data: authUserProps): Promise<tokensType> => {
  return axios.post(BASE_URL + '/user/token/', data, )
  .then((res) => res.data);
}

export const refreshToken = (refresh: string): Promise<accessTokenType> => {
  return axios.post(BASE_URL + '/user/token/refresh/', { refresh })
    .then((res) => res.data);
}