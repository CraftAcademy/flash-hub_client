import React, { Component } from 'react';
import { Menu, Header, Modal, Button } from 'semantic-ui-react';
import '../styling/customize.css';
import LoginForm from './LoginForm';
import Logout from './Logout'
import SignupForm from './SignupForm';
import PresentSavedFlashcards from './PresentSavedFlashcards';
import { connect } from 'react-redux';


class Navbar extends Component {
  state = {}

  render() {
    let loginActions;
    let logoutActions;
    const { activeItem } = this.state;
    let userSavedFlashcards;

    if (this.props.currentUser.isSignedIn === false) {
      loginActions = (
        <>
          <Menu.Item>
            <LoginForm />
          </Menu.Item>
          <Menu.Item>
            <SignupForm />
          </Menu.Item>
        </>
      );
    } else {
      userSavedFlashcards = (
        <>
          <Menu.Item>
            <Modal
              id='modal'
              trigger={
                <Button id='my-flashcards-button'>
                  My Flashcards
                </Button>
              }>
                <PresentSavedFlashcards />
              </Modal>
          </Menu.Item>
            <Logout />
        </>
      ) 
    }

    return (
      <Menu id='navbar'>
        <Header 
          position='left' 
          id='header' 
          style={{ fontSize: '4rem', textAlign: 'center', fontFamily: 'Londrina Shadow' }}
        >
          Flashcard Hub
        </Header>
        <Menu.Menu position='right'>
          <Modal id='instructions' basic size='small' trigger={<Button basic color='grey' id='info'>How This Works</Button>}>
            <ul>
              <li>Coffee</li>
              <li>Tea</li>
              <li>Milk</li>
            </ul>
          </Modal>
          <Menu.Item style={{ color: 'orange' }}
            name='login'
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          >
            Log In
          </Menu.Item>
          <Menu.Item style={{ color: '#E58869' }}
            name='signup'
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
          >
            Sign Up
          </Menu.Item>
          {loginActions}
          {logoutActions}
          {userSavedFlashcards}
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  };
};

export default connect(
  mapStateToProps
)(Navbar);


