import React from 'react';
import './imagelinkform.css'

const ImageLinkForm = ({changes, submit}) => {
    return (
        <div className='datas'>
            <p className='f4 tc'>
                {`This magic brain will detect faces in your pictures. Give it a try.`}
            </p>
            <div className='shadow-2 pa4 br3'>
                <input onChange={changes} className=' pa2 w-70 center' placeholder='Paste picture link here...' type='text' />
                <button onClick={submit} className='w-30 grow link ph3 pv2 dib bg-light-purple white'>Detect</button>
            </div>
        </div>
    );
};

export default ImageLinkForm;