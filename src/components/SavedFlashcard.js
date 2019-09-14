import React from 'react';
import { Button, Container, Card, Grid, Label, Reveal } from 'semantic-ui-react';

const SavedFlashcard = (props) => {
  let savedFlashcard = props.savedFlashcard;

  return (
    <>
      <Container style={{ height: 600 }}>
        <Grid centered columns={2}>
          <Grid.Column width={11}>
            <div id='saved-flashcard-wrapper'>
              <Reveal animated='fade' id={`saved_id_${savedFlashcard.id}`}>
                <Reveal.Content visible>
                  <Card style={{ width: 580, height: 400 }}>
                    <Grid.Column width={2}>
                    <Label ribbon className='saved-ribbon' id={`category_${savedFlashcard.status}`}>
                      {savedFlashcard.status} collection
                    </Label>
                    </Grid.Column>
                    <Card.Header as="h1" className="ui orange header" id={`saved_question_${savedFlashcard.id}`} style={{ marginTop: '5em' }} textAlign='center'>
                      {savedFlashcard.question}
                    </Card.Header>
                  </Card>
                </Reveal.Content>
                <Reveal.Content>
                  <Card style={{ width: 580, height: 400 }}>
                    <Grid.Column width={2}>
                    <Label ribbon className='saved-ribbon' id={`category_${savedFlashcard.status}`}>
                      {savedFlashcard.status} collection
                    </Label>
                    </Grid.Column>
                    <Card.Header as="h3" className="ui black header" id={`saved_answer_${savedFlashcard.id}`} style={{ marginTop: '9em', marginLeft: '1em', marginRight: '1em' }} textAlign='center'>
                      {savedFlashcard.answer}
                    </Card.Header>
                  </Card>
                </Reveal.Content>
              </Reveal>
            </div>
          </Grid.Column>

          <Grid.Column width={11}>
            <div id='saved-flashcard-button-wrapper'>
              <Button
                className='button-class'
                onClick={props.getOtherCollection}
                id='change_collection'
                style={{ width: 191, height: 50 }}
              >
              {props.otherCollection}
              </Button>
              <Button 
                className='button-class'
                onClick={props.nextCard}
                id='previous_card'
                style={{ width: 191, height: 50 }}
              >
                Previous Card
              </Button>
              <Button 
                className='button-class'
                onClick={props.nextCard}
                id='next_card'
                style={{ width: 191, height: 50 }}
              >
                Next Card
              </Button>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
      </>
    )
  }

export default SavedFlashcard;