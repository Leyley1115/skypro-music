'use client';

import styles from './page.module.css';
import Bar from '../../components/Bar/Bar';
import Nav from '../../components/Nav/Nav';
import CenterBlock from '../../components/CenterBlock/CenterBlock';
import SideBar from '../../components/SideBar/SideBar';
import { useEffect, useState } from 'react';
import { getAllTracks } from '../../tracks/tracksApi';
import { TrackType } from '@/src/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllTracks()
      .then((res) => {
        setTracks(res);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.log(error.response.data);
            setError(error.response.data?.message || 'Ошибка загрузки треков');
          } else if (error.request) {
            console.log(error.request);
            setError('Что-то с интернетом');
          } else {
            console.log(error.message);
            setError('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          {error && <div>{error}</div>}
          <Nav />
          <CenterBlock tracks={tracks} isLoading={isLoading} />
          <SideBar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
