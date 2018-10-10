import React from 'react'

import { ListProvider, ListConsumer, withList } from './list'
import { DrawerProvider, DrawerConsumer } from './drawer'
import { AuthProvider, AuthConsumer } from './auth'

export {
  ListProvider,
  ListConsumer,
  withList,
  DrawerProvider,
  DrawerConsumer,
  AuthProvider,
  AuthConsumer,
}

export const ContextProvider = props => (
  <AuthProvider>
    <ListProvider>
      <DrawerProvider>{props.children}</DrawerProvider>
    </ListProvider>
  </AuthProvider>
)
