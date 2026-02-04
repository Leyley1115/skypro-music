'use client';
import styles from './centerblock.module.css';
import classNames from 'classnames';
import Search from '../Search/Search';
import Link from 'next/link';
import { useState } from 'react';
import Filter from '../Filter/Filter';
import { formatTime } from '@/src/utils/helper';
import { data } from '@/src/data';
import { getUniqueValuesByKey } from '@/src/utils/helper';

export default function CenterBlock() {
  const [openFilter, setOpenFilter] = useState<
    null | 'author' | 'year' | 'genre'
  >(null);
  const timeFilter: string[] = [
    'По умолчанию',
    'Сначала новые',
    'Сначала старые',
  ];
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[],
    value: string,
  ) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  };

  return (
    <div className={styles.centerblock}>
      <Search title="Заголовок" />
      <h2 className={styles.centerblock__h2}>Треки</h2>

      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <Filter
          label="исполнителю"
          values={getUniqueValuesByKey(data, 'author')}
          open={openFilter === 'author'}
          onToggle={() =>
            setOpenFilter(openFilter === 'author' ? null : 'author')
          }
          selectedValues={selectedItems}
          onSelect={(v) => toggle(setSelectedItems, selectedItems, v)}
        />
        <Filter
          label="году выпуска"
          values={timeFilter}
          open={openFilter === 'year'}
          onToggle={() => setOpenFilter(openFilter === 'year' ? null : 'year')}
          selectedValues={selectedItems}
          onSelect={(v) => toggle(setSelectedItems, selectedItems, v)}
        />
        <Filter
          label="жанру"
          values={getUniqueValuesByKey(data, 'genre')}
          open={openFilter === 'genre'}
          onToggle={() =>
            setOpenFilter(openFilter === 'genre' ? null : 'genre')
          }
          selectedValues={selectedItems}
          onSelect={(v) => toggle(setSelectedItems, selectedItems, v)}
        />
      </div>

      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="./img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className="content__playlist">
          {data.map((track) => (
            <div key={track._id} className={styles.playlist__item}>
              <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                  <div className={styles.track__titleImage}>
                    <svg className={styles.track__titleSvg}>
                      <use xlinkHref="./img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  </div>
                  <div className={styles['track__title-text']}>
                    <Link className={styles.track__titleLink} href="">
                      {track.name}
                      <span className={styles.track__titleSpan}></span>
                    </Link>
                  </div>
                </div>

                <div className={styles.track__author}>
                  <Link className={styles.track__authorLink} href="">
                    {track.author}
                  </Link>
                </div>

                <div className={styles.track__album}>
                  <Link className={styles.track__albumLink} href="">
                    {track.album}
                  </Link>
                </div>

                <div className={styles.track__time}>
                  <svg className={styles.track__timeSvg}>
                    <use xlinkHref="./img/icon/sprite.svg#icon-like"></use>
                  </svg>
                  <span className={styles.track__timeText}>
                    {formatTime(track.duration_in_seconds)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
