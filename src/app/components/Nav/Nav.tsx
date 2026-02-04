'use client';

import Image from 'next/image';
import styles from './nav.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
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
            <li className={styles.menu__item}>
              <Link href="#" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="../signin.html" className={styles.menu__link}>
                Войти
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
