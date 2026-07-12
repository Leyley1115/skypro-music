'use client';

import { logout } from '../../services/auth/authApi';
import Image from 'next/image';
import styles from './nav.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Nav() {
  const [token, setToken] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  {
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
  logout();
  localStorage.removeItem('token');
  setToken(null);
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
            {token && (
            <li className={styles.menu__item}>
             
                <Link href="#" className={styles.menu__link}>
                  Мой плейлист
                </Link>
             
            </li> 
            )}
            <li className={styles.menu__item}>
              {!token && (
                <Link href="/auth/signin" className={styles.menu__link}>
                  Войти
                </Link>
              )}
              {token && (
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
