import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { signOutUser } from '../state/actions/reduxTokenAuthConfig';

class Logout extends Component {

  signOut = (e) => {
    e.preventDefault();
    const { signOutUser } = this.props;
    signOutUser()
  };

  render() {
    const { signOut } = this;

    return (
      <>
      <Menu.Item
        id="logout-button"
        onClick={signOut}
      >
        Log Out
      </Menu.Item>
    </>
    )
  }

  
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
  }
}

export default(connect(
  mapStateToProps,
  {signOutUser},
)(Logout));
