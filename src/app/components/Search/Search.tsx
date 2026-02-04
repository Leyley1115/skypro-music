'use client';
import { useState } from 'react';

import styles from './search.module.css';

type searchProp = {
  title: string;
};

export default function Search({ title }: searchProp) {
  const [searchInput, setSearchInput] = useState('');
  // const onSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {

  // }
  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="./img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        // onChange={(e) => }
      />
    </div>
  );
}
