import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import Particles from "react-particles-js";
import { Server, Response } from "miragejs";

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

ReactDOM.render(
    <div>
        <Particles className='particles' params={particlesOptions} />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Delegate the requests to Mirage when Cypress loads the application
if (window.Cypress) {
    new Server({
        environment: "test",
        routes() {
            let methods = ["get", "put", "patch", "post", "delete"]
            methods.forEach((method) => {
                this[method]("/*", async (schema, request) => {
                    let [status, headers, body] = await window.handleFromCypress(request)
                    return new Response(status, headers, body)
                })
            })
        },
    })
}
