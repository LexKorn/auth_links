import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {LinksPage} from './pages/LinksPage';
import {AuthPage} from './pages/AuthPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='/links' element={<LinksPage />}></Route>
                <Route path="/*" element={<Navigate replace to="/links" />} />
            </Routes>
        );        
    } else {
        return (
            <Routes>
                <Route path='/' element={<AuthPage />}></Route>
                <Route path="/*" element={<Navigate replace to="/" />} />
            </Routes>
        );
    }
};