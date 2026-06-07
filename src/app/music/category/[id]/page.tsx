'use client';

import styles from '../../main/page.module.css';
import Bar from '../../../components/Bar/Bar';
import Nav from '../../../components/Nav/Nav';
import CenterBlock from '../../../components/CenterBlock/CenterBlock';
import SideBar from '../../../components/SideBar/SideBar';
import { useEffect, useState } from 'react';
import {
  getAllTracks,
  getSelection,
  getTracksByIds,
} from '../../../tracks/tracksApi';
import { TrackType } from '@/src/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';

export default function Category() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const categoryMap: Record<string, string> = {
    '1': 'Плейлист дня',
    '2': '100 тенцевальных хитов',
    '3': 'Инди-заряд',
  };

  useEffect(() => {
    setIsLoading(true);

    const findArray = (
      value: any,
    ): Array<number | string> | TrackType[] | null => {
      if (Array.isArray(value)) return value;
      if (value && typeof value === 'object') {
        for (const child of Object.values(value)) {
          const found = findArray(child);
          if (found) return found;
        }
      }
      return null;
    };

    const normalizeSelection = (selection: any) => findArray(selection);

    const loadTracks = async () => {
      if (!id) {
        return getAllTracks();
      }

      const selectionId = Number(id) + 1;
      const selection = await getSelection(selectionId);
      const payload = normalizeSelection(selection);

      if (Array.isArray(payload)) {
        if (payload.length === 0) return [];
        if (
          payload.every(
            (item) => typeof item === 'number' || typeof item === 'string',
          )
        ) {
          return getTracksByIds(payload as Array<number | string>);
        }
        return payload as TrackType[];
      }

      return getAllTracks();
    };

    loadTracks()
      .then((res) => setTracks(res))
      .catch((err) => {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Ошибка загрузки треков');
        } else {
          setError('Неизвестная ошибка');
        }
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          {error && <div>{error}</div>}
          <Nav />
          <CenterBlock
            tracks={tracks}
            isLoading={isLoading}
            activeCategory={id ? categoryMap[id] : null}
          />
          <SideBar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
