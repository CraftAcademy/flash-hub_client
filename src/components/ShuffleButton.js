import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

const ShuffleButton = (props) => {
  
  return (
    <>
    <Grid centered columns={2}>
      <Grid.Column width={11}>
        <Button className='update-button' onClick={props.visitorGetNextCard} id='next-button' style={{ width: 191, height: 50 }}>
          Next card please
        </Button>
      </Grid.Column>
    </Grid>
  </>
  )
};

export default ShuffleButton;