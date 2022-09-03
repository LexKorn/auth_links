import { useEffect } from 'react';

export const InputFields = ({link, setLink, handler, title, button}) => {
    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const keyPress = (e) => {
        const code = e.keyCode || e.which;

        if (code === 13) {
            handler()
        }
    };

    return (
        <>
            <div className='row'>
                <div className='col s6 offset-s3'>
                    <h1>{title}</h1>
                    <div className="input-field">
                        <input 
                            placeholder="Ссылка" 
                            id="link" 
                            type="text" 
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            onKeyPress={e => keyPress(e)} />                        
                        <label htmlFor='link'>Введите ссылку</label>                        
                    </div>  
                    <button className="blue darken-1 btn" onClick={handler}>{button}</button>                   
                </div>                           
            </div> 
        </>
    );
};