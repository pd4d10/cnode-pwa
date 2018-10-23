import React from 'react'

const { Consumer, Provider } = React.createContext()

export const HintConsumer = Consumer

export class HintProvider extends React.Component {
  state = {
    visible: false,
    message: '',
  }

  setVisible = visible => {
    this.setState({ visible })
  }

  show = message => {
    this.setState({ visible: true, message })
  }

  hide = () => {
    this.setState({ visible: false })
  }

  render() {
    const { visible, message } = this.state
    const { show, hide } = this
    return (
      <Provider value={{ visible, message, show, hide }}>
        {this.props.children}
      </Provider>
    )
  }
}
