import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import { signIn } from '../../../actions/profile';

const GoogleAuth = props => {
    const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            const auth = window.gapi.auth2.getAuthInstance();
            props.signIn(auth.currentUser.get().getId());
        }
        // else {
        //     props.signOut();
        // }
    };

    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1093539628095-vcrooulbub3vppi5mc0bglp5gkb41o95.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                const auth = window.gapi.auth2.getAuthInstance();
                
                onAuthChange(auth.isSignedIn.get());
                auth.isSignedIn.listen(onAuthChange);
            });
        });
    })

    const onSignInClick = () => {
        const auth = window.gapi.auth2.getAuthInstance();
        auth.signIn();
    };

    // onSignOutClick = () => {
    //     auth.signOut();
    // };
    
    const renderAuthButton = () => {
        if (props.isSignedIn === null) {
            return null;
        }
        else if (props.isSignedIn) {
            return (
                <button className="ui red google button">
                    <i className="google icon" />Sign Out
                </button>
            );
        }
        else {
            return (
                <button onClick={onSignInClick} className="ui red google button">
                    <i className="google icon" />Sign In with Google
                </button>
            );
        }
    }

    return (
        <div>
            {renderAuthButton()}
        </div>
    )
}

// GoogleAuth.propTypes = {

// }

const mapStateToProps = (state) => {
    return { authReducer: state.authReducer };
};

export default connect(mapStateToProps, { signIn })(GoogleAuth);
