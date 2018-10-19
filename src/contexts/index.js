import React from 'react'

import { TopicProvider, TopicConsumer } from './topic'
import { HintProvider, HintConsumer } from './hint'
import { AuthProvider, AuthConsumer } from './auth'

export { TopicConsumer, HintConsumer, AuthConsumer }

export const ContextProvider = ({ children }) => (
  <AuthProvider>
    <TopicProvider>
      <HintProvider>{children}</HintProvider>
    </TopicProvider>
  </AuthProvider>
)
