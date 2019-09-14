import React from 'react';
import "../styling/customize.css";
import { Container, Reveal, Card, Button, Grid, Label } from 'semantic-ui-react';

const Flashcard = (props) => {
  let flashcard = props.flashcard;
  let currentDeckCategory = props.currentDeckCategory;
  
  return (
    <>
    <Container>
      <Grid centered id='flashcard-wrapper'>
        <Grid.Column width={11}>
          <Reveal animated='fade' id={`id_${flashcard.id}`}>
            <Reveal.Content visible>
              <Card style={{ width: 580, height: 400 }}>
                <Grid.Column width={2}>
                  <Label ribbon className='flashcard-ribbon' id={`category_${currentDeckCategory}`} >
                    {currentDeckCategory}
                  </Label>
                </Grid.Column>
                <Card.Header 
                  as="h1" 
                  className="ui orange header" 
                  id={`question_${flashcard.id}`} 
                  style={{ marginTop: '5em' }} 
                  textAlign='center'
                >
                  {flashcard.question}
                </Card.Header>
              </Card>
            </Reveal.Content>
            <Reveal.Content>
              <Card style={{ width: 580, height: 400 }}>
                <Grid.Column width={2}>
                  <Label ribbon className='flashcard-ribbon' id={`category_${currentDeckCategory}`}>
                    {currentDeckCategory}
                  </Label>
                </Grid.Column>
                <Card.Header
                  as="h3" 
                  className="ui black header" 
                  id={`answer_${flashcard.id}`} 
                  style={{ marginTop: '8em', marginLeft: '1em', marginRight: '1em' }} 
                  textAlign='center'
                >
                  {flashcard.answer}
                </Card.Header>
              </Card>
            </Reveal.Content>
          </Reveal>
        </Grid.Column>

        <Grid.Column width={11}>
          <Button 
            className='update-button' 
            onClick={props.updateStatus} 
            id='red' 
            style={{ width: 191, height: 50 }}
          >
            Repeat, please
          </Button>
          <Button
            className='update-button' 
            onClick={props.updateStatus} 
            id='yellow' 
            style={{ width: 191, height: 50 }}
          >
            Needs more practice
          </Button>
          <Button 
            className='update-button' 
            onClick={props.updateStatus} 
            id='green' 
            style={{ width: 191, height: 50 }}
          >
            I got this
          </Button>
        </Grid.Column>
      </Grid>
      </Container>
    </>
  )
};

export default Flashcard;