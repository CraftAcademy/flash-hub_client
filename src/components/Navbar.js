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
          <Modal id='instructions' basic size='small' trigger={<Button basic id='info'>How This Works</Button>}>
            <ul id='list'>
              <li>Click Red button if you would like to save and see the flashcard after finishing the deck</li>
              <li>You got this, but you feel that you need a bit more practice. No problem! Just click yellow!</li>
              <li>Click green to continue learning!</li>
            </ul>
          </Modal>
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


