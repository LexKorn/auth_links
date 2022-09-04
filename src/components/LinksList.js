import { BACK_URL } from '../config';
import './linksList.css';

export const LinksList = ({links, handler}) => {
    const strLength = str => {
        if (str.length < 50) return str;
        else return `${str.substring(0, 50)}...`;
    };
    
    return (
        <>
            <div className='row'>
                <ul className="col s8 offset-s2 collection z-depth-4">
                    <li className="collection-item link">
                        <span onClick={() => handler('short')}>Short link</span>
                        <span onClick={() => handler('target')}>Target link</span>
                        <span onClick={() => handler('counter')}>Counter</span>
                    </li>
                    {links.map(item=> (
                        <li className="collection-item link" key={item.id}>
                            <a href={`${BACK_URL}/s/${item.short}`} target="_blank">{item.short}</a>
                            <a href={item.target} target="_blank">{strLength(item.target)}</a>
                            {item.counter}
                        </li>
                    ))}
                </ul>
            </div> 
        </>
    );
};