import React from 'react';
import { Button, Container, Card, Grid, Label, Reveal } from 'semantic-ui-react';

const SavedFlashcard = (props) => {
    let savedFlashcard = props.savedFlashcard;
  return (
    <>
      
      <Container style={{ height: 600 }}>
        <Grid centered columns={2}>
          <Grid.Column width={11}>
          <Button id="change_collection" onClick={props.getOtherCollection}>{props.otherCollection}</Button>
          <Button id="next_card" onClick={props.nextCard}>Next Card</Button>
          <Button id="previous_card" onClick={props.nextCard}>Previous Card</Button>
            <Reveal animated='fade' id={`saved_id_${savedFlashcard.id}`}>
              <Reveal.Content visible>
                <Card style={{ width: 580, height: 400 }}>
                  <Grid.Column width={2}>
                  <Label ribbon as='a' color='olive' id={`category_${savedFlashcard.status}`}>
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
                  <Label ribbon as='a' color='olive' id={`category_${savedFlashcard.status}`}>
                    {savedFlashcard.status} collection
                  </Label>
                  </Grid.Column>
                  <Card.Header as="h3" className="ui black header" id={`saved_answer_${savedFlashcard.id}`} style={{ marginTop: '9em', marginLeft: '1em', marginRight: '1em' }} textAlign='center'>
                    {savedFlashcard.answer}
                  </Card.Header>
                </Card>
              </Reveal.Content>
            </Reveal>
          </Grid.Column>
        </Grid>
      </Container>
      </>
    )
  }

export default SavedFlashcard;