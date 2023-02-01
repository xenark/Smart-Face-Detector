import React from 'react';

const Rank = ({userEntries, userName}) => {
    return (
        <div className='tc white'>
            <div className='f3 flex justify-center'>
               <section className='ttc'>{userName}</section>{', your current entry count is...'}
            </div>
            <div className='f1'>
                {userEntries}
            </div>
        </div>
    );
};

export default Rank;