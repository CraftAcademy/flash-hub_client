import React, { Component } from 'react';
import axios from 'axios';
import { updateFlashcardStatus } from "../modules/updateFlashcardStatus";
import SavedFlashcard from './SavedFlashcard';
import { connect } from 'react-redux';
import AlertMessage from './AlertMessage';
import StatusButtons from './StatusButtons';

class PresentSavedFlashcards extends Component {
  state = {
    savedFlashcards: [],
    activeCard: 0,
    currentCollection: 'red'
  };

  componentDidMount() {
    this.getSavedFlashcards();
  };

  getSavedFlashcards = async (event) => {
    var currentCollection

    if (event !== undefined) {  
      if (event.target.innerText == 'yellow') {
        currentCollection = event.target.innerText;
      } else {
        currentCollection = event.target.innerText;
      }
    } 
    else {
      currentCollection = this.state.currentCollection
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/saved_flashcards/?status=${currentCollection}`);
      this.setState({ 
        savedFlashcards: response.data.savedFlashcards,
        activeCard: 0,
        currentCollection: currentCollection,
        otherCollection: currentCollection == "red" ? "yellow" : "red"
      });
    } catch (error) {
      this.props.dispatchFlash(error.response.data.error, "error");
    }
  };

  updateStatus = (event) => {
    let status = event.target.id
    const savedFlashcards = this.state.savedFlashcards;
    let savedFlashcardId = this.state.savedFlashcards[this.state.activeCard].id
    updateFlashcardStatus(status, savedFlashcardId).then(() => {
      if (this.state.activeCard == savedFlashcards.length - 1) {
        this.setState({
          renderDeckOption: true
        })
      } else {
        this.setState({
          activeCard: this.state.activeCard + 1
        })
      }
    })
  };
  

  nextCard = (event) => {
    const savedFlashcards = this.state.savedFlashcards;
    if (event.target.id == 'next_card') {
      if (this.state.activeCard == savedFlashcards.length - 1) {
        this.setState({
          activeCard: 0
        })
      } else {
        this.setState({
          activeCard: this.state.activeCard + 1
        })
      }
    } else {
      if (this.state.activeCard == 0) {
        this.setState({
          activeCard: this.state.savedFlashcards.length - 1
        })
      } else {
        this.setState({
          activeCard: this.state.activeCard - 1
        })
      }
    }
  };

  render() {
    const savedFlashcards = this.state.savedFlashcards;
    let savedFlashcardDisplay;
    let updateFlashcardStatus;
    let flashMessage;
    let renderStatusButtons;

    if (this.props.showFlash === true) {
      flashMessage = <AlertMessage />;
    };

    if (this.props.currentUser.isSignedIn === true) {
      renderStatusButtons = (
        <StatusButtons />
      )
    }; 

    if (savedFlashcards.length >= 1) {
      savedFlashcardDisplay = (
        <SavedFlashcard
          savedFlashcard={savedFlashcards[this.state.activeCard]}
          key={savedFlashcards[this.state.activeCard].id}
          nextCard={this.nextCard}
          updateStatus={this.updateStatus}
          getOtherCollection={this.getSavedFlashcards}
          otherCollection={this.state.otherCollection}
        />
      );
    };
    return (
      <>
        {flashMessage}
        {savedFlashcardDisplay}
        {updateFlashcardStatus}
      </>
    )
  }
};

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    showFlash: state.flashes.showFlash
  };
};
const mapDispatchToProps = {
  dispatchFlash: (message, status) => ({
    type: "SHOW_FLASH_MESSAGE",
    payload: { flashMessage: message, status: status }
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PresentSavedFlashcards);