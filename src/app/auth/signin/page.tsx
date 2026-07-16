'use client';
import styles from './signin.module.css';
import {getToken} from '../../services/auth/authApi';
import { useState, ChangeEvent } from 'react';
import { authUser } from '../../services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import Link from 'next/link';
import {setAccessToken, setRefreshToken, setUsername} from '../../../store/features/authSlice';
import { useAppDispatch } from '@/src/store/store';

export default function Signin() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');
    console.log('signin submit', { email, password });

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Заполните все поля');
      return;
    }

    setIsLoading(true);

    try {
      const res = await getToken({ email, password })
      const token = res.access;
      dispatch(setUsername(email));

      if (!token) {
        setErrorMessage('Не удалось получить токен');
        return;
      }
      
      getToken({email, password})
      .then((res) =>{
        dispatch(setAccessToken(res.access));
        dispatch(setRefreshToken(res.refresh))
      })
      router.push('/music/main');
    } catch (error) {
      console.log('auth error', error);
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage(error.response.data?.message || 'Ошибка входа');
        } else if (error.request) {
          setErrorMessage('Отсутствует интернет, попробуй позже');
        } else {
          setErrorMessage('Неизвестная ошибка');
        }
      } else {
        setErrorMessage('Не удалось выполнить запрос');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        className={styles.modal__btnEnter}
        onClick={onSubmit}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
