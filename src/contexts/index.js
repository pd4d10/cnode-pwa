import React from 'react'

import { TopicProvider, TopicConsumer } from './topic'
import { DrawerProvider, DrawerConsumer } from './drawer'
import { AuthProvider, AuthConsumer } from './auth'

export { TopicConsumer, DrawerConsumer, AuthConsumer }

export const ContextProvider = ({ children }) => (
  <AuthProvider>
    <TopicProvider>
      <DrawerProvider>{children}</DrawerProvider>
    </TopicProvider>
  </AuthProvider>
)
