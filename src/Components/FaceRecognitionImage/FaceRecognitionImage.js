import React from 'react';
import './facereg.css'
export const FaceRecognitionImage = ({ face, clearImage, link }) => {
    return (
        clearImage === true ? '' : <div className='face'>
            <img alt='face-detection-pic' id='face' src={link} />
            <section style={{
                top: face.top, bottom: face.bottom, right: face.right, left:
                    face.left
            }}>
            </section>
        </div>
    );
};

