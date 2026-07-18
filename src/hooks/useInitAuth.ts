import { useAppDispatch } from '@/src/store/store';
import { setAccessToken, setRefreshToken, setUsername } from '@/src/store/features/authSlice';
import { useEffect } from 'react';
import { getFavoriteTracks } from '../app/services/tracks/tracksApi';
import { refreshToken } from '../app/services/auth/authApi';
import { setFavoriteTracks } from '../store/features/trackSlice';

export const useInitAuth = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const access = localStorage.getItem('access');
        const refresh = localStorage.getItem('refresh');
        const username = localStorage.getItem('username');

        dispatch(setAccessToken(access));
        dispatch(setRefreshToken(refresh));
        dispatch(setUsername(username || ""));

        if (!access || !refresh) return;

        const loadFavorites = async () => {
            try {
                const tracks = await getFavoriteTracks(access);
                const favoriteTracks = tracks?.data;
                dispatch(setFavoriteTracks(favoriteTracks));
            } catch (error: any) {
                if (error?.response?.status === 401) {
                    try {
                        const refreshed = await refreshToken(refresh);
                        dispatch(setAccessToken(refreshed.access));
                        const tracks = await getFavoriteTracks(refreshed.access);
                        const favoriteTracks = tracks?.data;
                        dispatch(setFavoriteTracks(favoriteTracks));
                    } catch (refreshError) {
                        console.error('Ошибка refresh', refreshError);
                    }
                    return;
                }

                console.error('Ошибка загрузки любимых треков', error);
            }
        };

        loadFavorites();
    }, [dispatch]);
    
}