import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { InputFields } from '../components/InputFields';
import { LinksList } from '../components/LinksList';
import { useMessage } from '../hooks/message.hook';
import { BACK_URL } from '../config';


export const LinksPage = () => {
    const {token} = useContext(AuthContext);
    const message = useMessage();

    const [link, setLink] = useState('');
    const [links, setLinks] = useState([]);
    // const [idLink, setIdLink] = useState('');
    // const [shortLink, setShortLink] = useState('');
    // const [targetLink, setTargetLink] = useState('');
    // const [counter, setCounter] = useState('');

    const createLinkHandler = async() => {        
        try {
			const response = await fetch(`${BACK_URL}/squeeze?link=${link}`, {
				method: 'POST',
				headers: {
                    'Authorization': `Bearer ${token}`,
				}        
			});

			const data = await response.json();

			if (response.status !== 200) {
				console.error(data);
			}

            console.log(data);

            setLink('');
            fetchLinks();
            // setShortLink(data.short);           
            // setLinks(state => [...state, data]);
            // setIdLink(data.id);           
            // setTargetLink(data.target);
            // setCounter(data.counter);

		} catch(err) {
			console.error(err);
		}
    };

    // GET contact
    useEffect(() => {
		fetchLinks();
	}, [token]);

	const fetchLinks = async () => {
		fetch(`${BACK_URL}/statistics?offset=0&limit=5`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
			.then((json) => json.json())
			.then((data) => {
				setLinks(data);
			})
			.catch((err) => console.error(err))
	};


    return (
        <div>
            <InputFields 
                link={link} 
                setLink={setLink} 
                handler={createLinkHandler} 
                title='Создайте короткую ссылку'
                button='Создать' /> 
            <LinksList links={links} />
        </div>
    );
};