import { useAppDispatch } from '@/src/store/store';
import { setAccessToken, setRefreshToken, setUsername } from '@/src/store/features/authSlice';
import { useEffect } from 'react';

export const useInitAuth = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const access = localStorage.getItem('access');
        const refresh = localStorage.getItem('refresh');
        const username = localStorage.getItem('username');

        dispatch(setAccessToken(access));
        dispatch(setRefreshToken(refresh));
        dispatch(setUsername(username || ""));
    }, [dispatch]);
    
}