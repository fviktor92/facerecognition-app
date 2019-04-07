import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';

const apiurl = process.env.API_URL;

const initialState = {
    input: '',
    imageUrl: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = initialState
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        if (token)
        {
            fetch(`${apiurl}/signin`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then(resp => resp.json())
            .then(data => {
                if (data && data.id) {
                    fetch(`${apiurl}/profile/${data.id}`, {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    })
                    .then(resp => resp.json())
                    .then(user => {
                        if (user && user.email) {
                            this.loadUser(user);
                            this.onRouteChange('home');
                        }
                    })
                }
            })
            .catch(console.log)
        }
    }

    loadUser = (user) => {
        this.setState({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                entries: user.entries,
                joined: user.joined
            }
        })
    };

    calculateFaceLocations = (data) => {
        if (data && data.outputs) {
            const regions = data.outputs[0].data.regions;
            const image = document.getElementById('inputimage');
            const width = Number(image.width);
            const height = Number(image.height);
            const boxes = [];

            for (let i in regions) {
                let box = regions[i].region_info.bounding_box;

                boxes.push({
                    "topRow": box.top_row * height,
                    "leftCol": box.left_col * width,
                    "bottomRow": height - (box.bottom_row * height),
                    "rightCol": width - (box.right_col * width)
                });
            }
            return boxes;
        }
        return []
    };

    setFaceBoxes = (boxes) => {
        if (boxes) {
            this.setState({boxes: boxes});
        }
    };

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    };

    onPictureSubmit = () => {
        this.setState({imageUrl: this.state.input});
        fetch(`${apiurl}/imageurl`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response) {
                fetch(`${apiurl}/image`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': window.sessionStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, {entries: count}))
                    })
                    .catch(console.log);
            }
            this.setFaceBoxes(this.calculateFaceLocations(response))
        })
        .catch(err => console.log(err));
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    };

    render() {
        const {isSignedIn, imageUrl, route, boxes} = this.state;
        return (
            <div className="App">
                <div className='content'>
                    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                    {route === 'home'
                        ? <div id='app-panel'>
                            <Logo/>
                            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                            <ImageLinkForm onInputChange={this.onInputChange}
                                           onButtonSubmit={this.onPictureSubmit}/>
                            <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
                        </div>
                        : (
                            route === 'signin' || route === 'signout'
                                ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default App;
