import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/index';

class GoogleAuth extends Component {
  componentDidMount() {
    // Initialize the library
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '935726705239-ce5ij93be5mb7a25fldmd7nvlf55heju.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return (
        <button className={'ui loading button'}>
          <i className={'google icon'} />
          Sign in with Google
        </button>
      );
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className={'ui google button'}>
          <i className={'google icon'} />
          Sign out
        </button>
      );
    } else {
      return (
        <button
          onClick={this.onSignInClick}
          className={'ui primary google button'}
        >
          <i className={'google icon'} />
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    //Helper method renderAuthButton()
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
