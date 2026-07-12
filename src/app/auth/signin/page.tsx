'use client';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import { authUser } from '../../services/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function Signin() {
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
      console.log('calling authUser');
      const res = await authUser({ email, password });
      const token = res.data?.access;

      // if (!token) {
      //   setErrorMessage('Не удалось получить токен');
      //   return;
      // }

      localStorage.setItem('token', token);
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
