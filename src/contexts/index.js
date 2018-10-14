import React from 'react'

import { ListProvider, ListConsumer, withList } from './list'
import { DrawerProvider, DrawerConsumer } from './drawer'
import { AuthProvider, AuthConsumer } from './auth'

export {
  ListProvider,
  ListConsumer,
  DrawerProvider,
  DrawerConsumer,
  AuthProvider,
  AuthConsumer,
}

export const ContextProvider = ({ children }) => (
  <AuthProvider>
    <ListProvider>
      <DrawerProvider>{children}</DrawerProvider>
    </ListProvider>
  </AuthProvider>
)
