'use client';

import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { signUpUser } from '../../services/auth/authApi';
import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';

export default function SignUp() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else if (name === 'login') {
            setEmail(value);
        }
    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            setErrorMessage('Заполните все поля');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Пароли не совпадают');
            return;
        }
        setIsLoading(true);
        signUpUser({email, username: email, password}).then((res) => {
            console.log(res);
            if (res.status === 201) {
            alert('Регистрация прошла успешно');
            router.push('/music/main');
            }})
            .catch((error) => {
                if(error instanceof AxiosError){
                    if(error.response){
                        console.log(error.response.data.data?.errors);
                        setErrorMessage(error.response.data.message + (error.response.data.data?.errors.email ? error.response.data.data.errors.email : '') + (error.response.data.data?.errors.password ? error.response.data.data.errors.password : ''));
                    } else if (error.request){
                        setErrorMessage('Отсутствует интернет, попробуй позже');
                    } else{
                        setErrorMessage('Неизвестная ошибка');
                    }
                }
            })
            .finally(() =>{
                setIsLoading(false);
            }
        );

        
    };

    return (
        <>
            <Link href="/music/main">
                <div className={styles.modal__logo}>
                    <img src="/img/logo_modal.png" alt="logo" />
                </div>
            </Link>
            <input
                className={classNames(styles.modal__input, styles.login)}
                type="text"
                name="login"
                placeholder="Почта"
                onChange={onChangeField}
            />
            <input
                className={styles.modal__input}
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={onChangeField}
            />
            <input
                className={styles.modal__input}
                type="password"
                name="confirmPassword"
                placeholder="Повторите пароль"
                onChange={onChangeField}
            />
            <div className={styles.errorContainer}></div>
            <div className={styles.errorContainer}>{errorMessage}</div>
            <button disabled={isLoading} onClick={onSubmit} className={styles.modal__btnSignupEnt}>
                Зарегистрироваться
            </button>
        </>
    );
}