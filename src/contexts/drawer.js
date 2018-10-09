// @flow
import React from 'react'

const { Consumer, Provider } = React.createContext()

export const DrawerConsumer = Consumer

export const withDrawer = Component => props => (
  <Consumer>{params => <Component {...props} {...params} />}</Consumer>
)

export class DrawerProvider extends React.Component<any, { visible: boolean }> {
  state = {
    visible: false,
  }

  setVisible = (visible: boolean) => {
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
