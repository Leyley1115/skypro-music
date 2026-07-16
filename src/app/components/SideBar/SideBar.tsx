'use client';

import styles from './sidebar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/src/store/store';

export default function SideBar() {
  const pathname = usePathname();
  const active = (id: string) => pathname === `/music/category/${id}`;
  const username = useAppSelector((state) => state.auth.username);

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{username || 'Гость'}</p>
        <div className={styles.sidebar__icon}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>

      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div
            className={`${styles.sidebar__item} ${active('1') ? styles.active : ''}`}
          >
            <Link className={styles.sidebar__link} href="/music/category/1">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="плейлист дня"
                width={250}
                height={170}
              />
            </Link>
          </div>

          <div
            className={`${styles.sidebar__item} ${active('2') ? styles.active : ''}`}
          >
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="100 тенцевальных хитов"
                width={250}
                height={170}
              />
            </Link>
          </div>

          <div
            className={`${styles.sidebar__item} ${active('3') ? styles.active : ''}`}
          >
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="Инди-заряд"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
