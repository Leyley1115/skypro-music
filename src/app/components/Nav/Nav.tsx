'use client';

import { logout } from '../../services/auth/authApi';
import Image from 'next/image';
import styles from './nav.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useAppDispatch } from '@/src/store/store';
import { useAppSelector } from '@/src/store/store';
import { clearUser } from '@/src/store/features/authSlice';

export default function Nav() {
  const dispatch = useAppDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { access } = useAppSelector((state) => state.auth);
  const isAuth = Boolean(access && access.trim().length > 0);

  const handleLogout = () => {
    logout();
    dispatch(clearUser());
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
            {isAuth&& (
            <li className={styles.menu__item}>
                <Link href="#" className={styles.menu__link}>
                  Мой плейлист
                </Link>
             
            </li> 
            )}
            <li className={styles.menu__item}>
              {!isAuth && (
                <Link href="/auth/signin" className={styles.menu__link}>
                  Войти
                </Link>
              )}
              {isAuth&& (
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
}
