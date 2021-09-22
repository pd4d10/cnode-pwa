import React from 'react'
import { Snackbar } from '@material-ui/core'
import { useHint } from '../hooks'

export const Hint = () => {
  const { visible, message, hide } = useHint()

  return (
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
  )
}
