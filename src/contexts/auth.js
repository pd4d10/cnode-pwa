// @flow
import React from 'react'

const { Consumer, Provider } = React.createContext()

export const AuthConsumer = Consumer

type AuthState = {
  token: ?string,
}

export class AuthProvider extends React.Component<any, AuthState> {
  state = {
    token: null,
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    this.setState({ token })
  }

  render() {
    const {} = this.state
    const {} = this
    return <Provider value={{}}>{this.props.children}</Provider>
  }
}
