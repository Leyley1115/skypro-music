'use client';

import { logout } from '../../services/auth/authApi';
import Image from 'next/image';
import styles from './nav.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/src/store/store';
import { setUsername } from '@/src/store/features/authSlice';
import { useAppSelector } from '@/src/store/store';

export default function Nav() {
  const dispatch = useAppDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const access = useAppSelector((state) => state.auth);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  {
    useEffect(() =>{
      setAccessToken(localStorage.getItem('access'))
    }, [])

  const handleLogout = () => {
    dispatch(setUsername(''));
    logout();
    localStorage.removeItem('access');
    setAccessToken(null);
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div
        className={styles.nav__burger}
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div className={styles.nav__menu}>
        {isNavOpen && (
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="#" className={styles.menu__link}>
                Главное
              </Link>
            </li> 
            {accessToken&& (
            <li className={styles.menu__item}>
                <Link href="#" className={styles.menu__link}>
                  Мой плейлист
                </Link>
             
            </li> 
            )}
            <li className={styles.menu__item}>
              {!accessToken && (
                <Link href="/auth/signin" className={styles.menu__link}>
                  Войти
                </Link>
              )}
              {accessToken&& (
                <Link href="/music/main" className={styles.menu__link} onClick={handleLogout}>
                  Выйти
                </Link>
              )}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}}
