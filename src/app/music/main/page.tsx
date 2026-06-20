'use client';

import styles from './page.module.css';
import Bar from '../../components/Bar/Bar';
import Nav from '../../components/Nav/Nav';
import CenterBlock from '../../components/CenterBlock/CenterBlock';
import SideBar from '../../components/SideBar/SideBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllTracks } from '../../tracks/tracksApi';
import { TrackType } from '@/src/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/auth/signin');
      return;
    }

    getAllTracks()
      .then((res) => {
        setTracks(res);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data?.message || 'Ошибка загрузки треков');
          } else if (error.request) {
            setError('Что-то с интернетом');
          } else {
            setError('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

  return (
    <>
      <main className={styles.main}>
          {error && <div>{error}</div>}
          <Nav />
          <CenterBlock tracks={tracks} isLoading={isLoading} />
          <SideBar />
        </main>w
    </>
  );
}
