import React from 'react'

const { Consumer, Provider } = React.createContext()

export const DrawerConsumer = Consumer

export class DrawerProvider extends React.Component {
  state = {
    visible: false,
  }

  setVisible = visible => {
    this.setState({ visible })
  }

  render() {
    const { visible } = this.state
    const { setVisible } = this
    return (
      <Provider value={{ visible, setVisible }}>{this.props.children}</Provider>
    )
  }
}
