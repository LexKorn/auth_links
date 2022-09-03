import React, { useContext, useEffect, useState } from 'react';

import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import { AuthInputFields } from '../components/AuthInputFields';
import { BACK_URL } from '../config';


export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        username: '', 
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    const registerHandler = async () => {
        try {
            const data = await request(`${BACK_URL}/register?username=${form.username}&password=${form.password}`, 'POST');
            message('Пользователь создан');
            // console.log(data);
        } catch(err) {
            console.error(err);
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request(`${BACK_URL}/login`, 'POST', `grant_type=&username=${form.username}&password=${form.password}&scope=&client_id=&client_secret=`);
            // console.log(data);
            auth.login(data.access_token);

        } catch(err) {
            message('Не совпадает логин и пароль');
            console.error(err);
        }
    };


    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1>Сократи ссылку</h1>
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Авторизация</span>
                            <div>
                                <AuthInputFields title="username" value={form.username} handler={changeHandler} />
                                <AuthInputFields title="password" value={form.password} handler={changeHandler} />
                            
                            </div>
                        </div>
                        <div className="card-action">
                            <button 
                                className='btn yellow darken-4' 
                                style={{marginRight: 10}}  
                                onClick={loginHandler}
                                disabled={loading}
                                > Войти
                            </button>                              
                            <button 
                                className='btn grey lighten-1 black-text'
                                onClick={registerHandler}
                                disabled={loading}
                                >Регистрация
                            </button>
                        </div>
                </div>
            </div>            
        </div>
    );
};