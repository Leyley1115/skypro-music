'use client'
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

    const onChangeEmail = (e:ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    };

    const onChangePassword = (e:ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);
    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        setErrorMessage('');

        if(!email.trim() || !password.trim()){
            setErrorMessage('Заполните все поля');
            return
        }

        setIsLoading(true);

        authUser({email, password})
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                router.push('/music/main');
                }
            })
            .catch((error) => {
                if(error instanceof AxiosError){
                    if(error.response){
                        setErrorMessage(error.response.data.message);
                    } else if (error.request){
                        setErrorMessage('Отсутствует интернет, попробуй позже');
                    } else{
                        setErrorMessage('Неизвестная ошибка');
                    }
                }
                console.log(error.response.data);
            })
            .finally(() =>{
                setIsLoading(false);
            });
    }
    
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
        <button disabled={isLoading} className={styles.modal__btnEnter} onClick={onSubmit}>Войти</button>
        <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
            Зарегистрироваться
        </Link>
        </>
    );
}