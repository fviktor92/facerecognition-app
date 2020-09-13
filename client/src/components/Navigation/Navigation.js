import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return (
            <nav id='authenticated-navbar' style={{display: 'flex', justifyContent: 'flex-end'}}>
                <NavLink exact to='/signin' onClick={() => {
                    onRouteChange('signout');
                    window.sessionStorage.removeItem('token');
                }} id='signout-btn'
                         className='f6 br-pill bg-light-purple no-underline washed-blue ba b--light-purple grow pv2 ph3 dib mr3 pointer o-90'>Sign
                    out</NavLink>
            </nav>
        );
    } else {
        return (
            <nav id='anonymous-navbar' style={{display: 'flex', justifyContent: 'flex-end'}}>
                <NavLink exact to='/signin' onClick={() => onRouteChange('signin')} id='signin-btn'
                         className='f6 br-pill bg-light-purple no-underline washed-blue ba b--light-purple grow pv2 ph3 dib mr3 pointer o-90'>Sign
                    in</NavLink>
                <NavLink exact to='/register' onClick={() => onRouteChange('register')} id='register-btn'
                         className='f6 br-pill bg-light-purple no-underline washed-blue ba b--light-purple grow pv2 ph3 dib mr3 pointer o-90'>Register</NavLink>
            </nav>
        );
    }
}

export default Navigation;