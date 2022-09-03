import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback(token => {
        setToken(token);
        localStorage.setItem(storageName, JSON.stringify({token}));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token);
        }
        setReady(true);
    }, [login]);

    return { login, logout, token, ready };
};