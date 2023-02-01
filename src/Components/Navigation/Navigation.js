import React from 'react';
import './navigation.css'

const Navigation = ({ dashboard, currentRoute }) => {
    return (
        <div>
            {currentRoute !== 'home' ?
                <div className='inres'>
                    <nav onClick={() => { dashboard('signin') }} className=' nav shadow-2 pa2 br3 ma3 ml-auto dim white pointer grow '>
                        {'Sign In'}
                    </nav>
                    <nav onClick={() => { dashboard('register') }} className=' nav shadow-2 pa2 br3 ma3 ml-auto dim white pointer grow '>
                        {'Register'}
                    </nav>
                </div>
                : <nav onClick={() => { dashboard('signin') }} className=' nav shadow-2 pa2 br3 ma3 ml-auto dim white pointer grow '>
                    {'Sign Out'}
                </nav>}
        </div>
    );
};

export default Navigation;