import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { InputFields } from '../components/InputFields';
import { LinksList } from '../components/LinksList';
import { Pagination } from '../components/Pagination';
import { BACK_URL } from '../config';
import { Loader } from '../components/Loader';


export const LinksPage = () => {
    const {token} = useContext(AuthContext);

    const [link, setLink] = useState('');
    const [links, setLinks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [linksPerPage] = useState(4);
    const [directionSort, setDirectionSort] = useState(true);
    const [loading, setLoading] = useState(false);


    // POST link
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

            setLink('');
            fetchLinks();

		} catch(err) {
			console.error(err);
		}
    };

    
    // GET links
    useEffect(() => {
		fetchLinks();
	}, [token]);

	const fetchLinks = async () => {
        setLoading(true);

		fetch(`${BACK_URL}/statistics?offset=0&limit=5`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
			.then((json) => json.json())
			.then((data) => {
                setLinks(data);
                setLoading(false);
            })
			.catch((err) => {
                console.error(err);
                setLoading(false);
            });
	};


    // Pagination
    const lastLinksIndex = currentPage * linksPerPage;
    const firstLinksIndex = lastLinksIndex - linksPerPage;
    const currentLinks = links.slice(firstLinksIndex, lastLinksIndex);
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
    const nextPage = () => {
      if (currentPage < Math.ceil(links.length / linksPerPage)) {
        setCurrentPage(prev => prev + 1);
      }
    };
  
    const prevPage = () => {
      if (currentPage !== 1) {
        setCurrentPage(prev => prev - 1);
      }
    };


    // Sort
    const sortHandler = (e) => {
      let sortLinks = [];

      if (directionSort) {
        sortLinks = [...links].sort((a, b) => {
          return a[e] > b[e] ? 1 : -1;
        });
      } else {
        sortLinks = [...links].sort((a, b) => {
          return a[e] < b[e] ? 1 : -1;
        });
      }

      setLinks(sortLinks);
      setDirectionSort(!directionSort);
    };


    return (
        <div>
            <InputFields 
                link={link} 
                setLink={setLink} 
                handler={createLinkHandler} 
                title='Создайте короткую ссылку'
                button='Создать' /> 
            {loading ? <Loader /> : <LinksList links={currentLinks} handler={e => sortHandler(e)} />}
            <Pagination 
                linksPerPage={linksPerPage} 
                totalLinks={links.length}
                paginate={paginate}
                prevHandler={prevPage}
                nextHandler={nextPage} />
        </div>
    );
};