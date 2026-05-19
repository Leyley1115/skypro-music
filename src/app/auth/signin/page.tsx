'use client'
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import { AuthUser } from '../../services/auth/authApi';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (e:ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    };

    const onChangePassword = (e:ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);
    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        console.log("клик");
        
        if(!email.trim() || !password.trim()){
            console.log("пусто");
            return
        }

        AuthUser({email, password}).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }
    console.log("страница загрузилась");

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
        <div className={styles.errorContainer}>{/*Блок для ошибок*/}</div>
        <button type="button" className={styles.modal__btnEnter} onClick={onSubmit}>Войти</button>
        <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
            Зарегистрироваться
        </Link>
        </>
    );
}