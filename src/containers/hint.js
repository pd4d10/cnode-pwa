import React from 'react'
import { Snackbar } from '@material-ui/core'
import { HintConsumer } from '../contexts'

export default class Hint extends React.Component {
  render() {
    return (
      <HintConsumer>
        {({ visible, message, setVisible, hide }) => (
          <Snackbar
            open={visible}
            autoHideDuration={3000}
            onClose={hide}
            // ContentProps={{}}
            message={message}
            // action={
            //   <Button color="inherit" size="small" onClick={this.handleClose}>
            //     Undo
            //   </Button>
            // }
            // className={classes.snackbar}
          />
        )}
      </HintConsumer>
    )
  }
}
