import { BACK_URL } from '../config';
import './linksList.css';

export const LinksList = ({links}) => {
    return (
        <>
            <div className='row'>
                <ul className="col s8 offset-s2 collection z-depth-4">
                    {links.map(item=> (
                        <li className="collection-item link" key={item.id}>
                            <a href={`${BACK_URL}/s/${item.short}`} target="_blank">{item.short}</a>
                            <a href={item.target} target="_blank">{item.target}</a>
                            {item.counter}
                        </li>
                    ))}
                </ul>
            </div> 
        </>
    );
};