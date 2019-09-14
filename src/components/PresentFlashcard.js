import React, { Component } from 'react';
import axios from "axios";
import Flashcard from "./Flashcard";
import { Container, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import CategoryButtons from './CategoryButtons';
import ShuffleButton from './ShuffleButton';


export class PresentFlashcard extends Component {
  state = {
    flashcards: [],
    activeFlashcard: 0,
    nextDeckPage: null,
    deckCategory: '',
    onlySpecificTypeOfDeck: false
  };

  async componentDidMount() {
    const response = await axios.get("http://localhost:3000/api/decks");
    this.setState({
      flashcards: response.data.decks[0].flashcards,
      nextDeckPage: response.data.meta.nextPage,
      deckCategory: response.data.decks[0].category
    });
  };

  getNewDeck = async () => {
    let page;
    let response;

    if (this.state.nextDeckPage === null) {
      page = 1
    } else {
      page = this.state.nextDeckPage
    }

    if (this.state.onlySpecificTypeOfDeck === true) {
      response = await axios.get(`http://localhost:3000/api/decks/?page=${page}&category=${this.state.deckCategory}`);
    } else {
      response = await axios.get(`http://localhost:3000/api/decks/?page=${page}`);
    }

    this.setState({
      flashcards: response.data.decks[0].flashcards,
      activeFlashcard: 0,
      nextDeckPage: response.data.meta.nextPage,
      deckCategory: response.data.decks[0].category,
      renderDeckOption: false,
    });
  };

  repeatCurrentDeck = () => {
    this.setState({
      activeFlashcard: 0,
      renderDeckOption: false
    });
  };

  getCategoryDeck = async (event) => {
    let category = event.target.id

    const response = await axios.get(`http://localhost:3000/api/decks/?category=${category}`);

    this.setState({
      flashcards: response.data.decks[0].flashcards,
      activeFlashcard: 0,
      nextDeckPage: response.data.meta.nextPage,
      deckCategory: response.data.decks[0].category,
      renderDeckOption: false,
      onlySpecificTypeOfDeck: true
    });
  };

  visitorGetNextCard = (event) => {
    const flashcards = this.state.flashcards;
    if (event.target.id == 'next-button') {
      if (this.state.activeFlashcard + 1 == 10) {
        this.setState({
          renderDeckOption: true
        })
      } else {
        this.setState({
          activeFlashcard: this.state.activeFlashcard + 1
        })
      }
    });
  };

  render() {
    const flashcards = this.state.flashcards;
    let chooseDeckOption;
    let flashcardDisplay;
    let renderShuffleButton;

    if (flashcards.length >= 1 && this.state.renderDeckOption !== true) {
      flashcardDisplay = (
        <Flashcard
          flashcard={flashcards[this.state.activeFlashcard]}
          key={flashcards[this.state.activeFlashcard].id}
          nextCard={this.nextCard}
          currentDeckCategory={this.state.deckCategory}
        />
      );
    };

    if (this.props.currentUser.isSignedIn === false) {
      renderShuffleButton = (
        <ShuffleButton />
      )
    } 

    if (this.state.renderDeckOption === true) {
      chooseDeckOption = (
        <>
        <Container>
            <Grid id='repeat' centered columns={20}>
              <Grid.Column verticalAlign='middle' width={40} >
                <Button 
                  onClick={() => this.repeatCurrentDeck()} 
                  style={{ width: 200, height: 40 }}
                  id="repeat-deck"
                  basic color='red'
                >
                  Repeat
                </Button>
                <Button 
                  onClick={() => this.getNewDeck()} 
                  style={{ width: 200, height: 40 }}
                  id="get-new-deck"
                  basic color='green'
                >
                  New Deck
                </Button>
              </Grid.Column>
            </Grid>
          </Container>
        </>
      )
    };

    return (
      <>
        <Container>
          {flashcardDisplay}
          {renderShuffleButton}
          {chooseDeckOption}
        </Container>

        <CategoryButtons
          getCategoryDeck={this.getCategoryDeck} />
      </>
    )
  };
};

export default PresentFlashcard;
