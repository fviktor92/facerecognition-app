import React from 'react';
import {NavLink} from "react-router-dom";

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem('token', token);
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.userId && data.success === 'true') {
                this.saveAuthTokenInSession(data.token);
                fetch(`http://localhost:3001/profile/${data.userId}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': data.token
                    }
                })
                .then(resp => resp.json())
                .then(user => {
                    if (user && user.email) {
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                    }
                })
            .catch(console.log)
            }
        });
    };

    render() {
        const {onRouteChange} = this.props;
        return (
            <article id='signin-panel' className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend id='signin-title' className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div id='email-container' className="mt3">
                                <label id='email-label' className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange}
                                       className="pa2 input-reset ba bg-transparent hover-bg-black-30 hover-white w-100"
                                       type="email" name="email-address" id="email-address"/>
                            </div>
                            <div id='password-container' className="mv3">
                                <label id='password-label' className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <NavLink exact to='/app'>
                                <input onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        this.onSubmitSignIn();
                                    }
                                }}
                                       onChange={this.onPasswordChange}
                                       className="b pa2 input-reset ba bg-transparent hover-bg-black-30 hover-white w-100"
                                       type="password" name="password" id="password"/>
                                </NavLink>
                            </div>
                        </fieldset>
                        <div>
                                <input
                                    id='signin-submit-btn'
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <NavLink exact to='/register' id='signin-register-btn' onClick={() => onRouteChange('register')}
                               className="f6 link dim black db pointer">Register</NavLink>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;