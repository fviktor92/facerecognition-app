import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import 'tachyons';
import Particles from "react-particles-js";

const particlesOptions = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 500
            }
        }
    }
};

if (window.Cypress) {
    window.appRef = React.createRef();
}


ReactDOM.render(
    <div>
        <Particles className='particles' params={particlesOptions}/>
        <BrowserRouter>
            <App ref={window.appRef}/>
        </BrowserRouter>
    </div>, document.getElementById('root'));