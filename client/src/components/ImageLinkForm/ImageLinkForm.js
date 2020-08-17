import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p id='description-txt' className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input id='url-input' className='f4 pa2 w-70 center b--none-ns 0-90' type='url' placeholder='Enter picture URL' onChange={onInputChange}/>
                    <button id='detect-btn' className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple bn-l o-90' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;