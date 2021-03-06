import React from 'react';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            errorMessage: ''
        };
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };


    onSubmitRegister = () => {
        fetch(this.props.apiurl + '/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        }).then(response => {
            response.json().then(resp => {
                if (resp.id) {
                    this.props.loadUser(resp);
                    this.props.onRouteChange('home');
                } else {
                    this.setState({errorMessage: resp.errorMessage});
                    this.props.onRouteChange('register');
                }
            });
        });
    };

    render() {
        return (
            <article id='register-panel' className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend id='register-title' className="f1 fw6 ph0 mh0">Register</legend>
                            <div id='name-container' className="mt3">
                                <label id='name-label' className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black-30 hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}/>
                            </div>
                            <div id='email-container' className="mt3">
                                <label id='email-label' className="db fw6 lh-copy f6"
                                       htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black-30 hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}/>
                            </div>
                            <div id='password-container' className="mv3">
                                <label id='password-label' className="db fw6 lh-copy f6"
                                       htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black-30 hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <input
                            id='register-register-btn'
                            onClick={this.onSubmitRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Register"/>
                        {this.state.errorMessage && <h3 id="register-error-message"
                                                        className="db fw6 lh-copy f6 mw5">{this.state.errorMessage}</h3>}
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;