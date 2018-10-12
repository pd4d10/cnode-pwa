import React from 'react'

const { Consumer, Provider } = React.createContext()

export const DrawerConsumer = Consumer

export class DrawerProvider extends React.Component {
  state = {
    visible: false,
    setVisible: visible => {
      this.setState({ visible })
    },
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
