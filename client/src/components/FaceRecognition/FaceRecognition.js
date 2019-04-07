import React from 'react';
import FaceBoxes from "../FaceBoxes/FaceBoxes";

const FaceRecognition = ({boxes, imageUrl}) => {

    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='facerecognition' src={imageUrl} width='500px' height='auto'/>
                <FaceBoxes boxes={boxes}/>
            </div>
        </div>
    );
};

export default FaceRecognition;