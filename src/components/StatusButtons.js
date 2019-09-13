import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

const StatusButtons = (props) => {
  
  return (
    <div className='button-group'>
    <Grid centered columns={2}>
      <Grid.Column width={11}>
        <Button className='update-button' onClick={props.updateStatus} id='red' style={{ width: 191, height: 50 }}>
          Repeat, please
        </Button>
        <Button className='update-button' onClick={props.updateStatus} id='yellow' style={{ width: 191, height: 50 }}>
          Needs more practice
        </Button>
        <Button className='update-button' onClick={props.updateStatus} id='green' style={{ width: 191, height: 50 }}>
          I got this!
        </Button>
      </Grid.Column>
    </Grid>
  </div>
  )
}

export default StatusButtons;