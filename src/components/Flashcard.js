import React from 'react';
import "../styling/customize.css";
import { Reveal, Card, Grid, Label } from 'semantic-ui-react';

const Flashcard = (props) => {
  let flashcard = props.flashcard;
  let currentDeckCategory = props.currentDeckCategory;
  
  return (
    <>
      <Grid centered columns={2}>
        <Grid.Column width={11}>
          <Reveal animated='fade' id={`id_${flashcard.id}`}>
            <Reveal.Content visible>
              <Card style={{ width: 580, height: 400 }}>
                <Grid.Column width={2}>
                  <Label ribbon as='a' color='olive' id={`category_${currentDeckCategory}`} >
                    {currentDeckCategory}
                  </Label>
                </Grid.Column>
                <Card.Header as="h1" className="ui orange header" id={`question_${flashcard.id}`} style={{ marginTop: '5em' }} textAlign='center'>
                  {flashcard.question}
                </Card.Header>
              </Card>
            </Reveal.Content>
            <Reveal.Content>
              <Card style={{ width: 580, height: 400 }}>
                <Grid.Column width={2}>
                  <Label ribbon as='a' color='olive' id={`category_${currentDeckCategory}`}>
                    {currentDeckCategory}
                  </Label>
                </Grid.Column>
                <Card.Header as="h3" className="ui black header" id={`answer_${flashcard.id}`} style={{ marginTop: '9em', marginLeft: '1em', marginRight: '1em' }} textAlign='center'>
                  {flashcard.answer}
                </Card.Header>
              </Card>
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </>
  )
};

export default Flashcard;