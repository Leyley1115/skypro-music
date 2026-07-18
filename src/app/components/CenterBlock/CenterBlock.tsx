'use client';
import styles from './centerblock.module.css';
import classNames from 'classnames';
import Search from '../Search/Search';
import { useState } from 'react';
import Filter from '../Filter/Filter';
import { getUniqueValuesByKey } from '@/src/utils/helper';
import Track from '../Track/Track';
import { TrackType } from '@/src/sharedTypes/sharedTypes';

type CenterBlockProps = {
  tracks?: TrackType[];
  isLoading?: boolean;
  errorRes?: string | null;
  title?: string;
};

export default function CenterBlock({
  tracks = [],
  isLoading,
  errorRes,
  title,
}: CenterBlockProps) {
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

  const playlist = tracks;

  return (
    <div className={styles.centerblock}>
      <Search title={title ?? 'Заголовок'} />
      <h2 className={styles.centerblock__h2}>{title ?? 'Треки'}</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <Filter
          label="исполнителю"
          values={getUniqueValuesByKey(playlist, 'author')}
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
          values={getUniqueValuesByKey(playlist, 'genre')}
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
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className="content__playlist">
          {errorRes 
          ? errorRes
          : isLoading
              ? 'Загрузка...'
              : playlist.map((track) => (
              <Track track={track} key={track._id} playlist={playlist} />
            ))
          }
        </div>
      </div>
    </div>
  );
}
