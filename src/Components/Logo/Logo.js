import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'

import './logo.css'

const Logo = () => {
    return (
        <div className='logo ma4 mt0'>
            <Tilt>
                <div className='tilt shadow-2' style={{ height: '150px', width: '150px' }}>
                    <img src={brain} alt={brain} />
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;