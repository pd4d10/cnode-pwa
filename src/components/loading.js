import React from 'react'
import { CircularProgress } from '@material-ui/core'

export const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      padding: 12,
    }}
  >
    <CircularProgress size={24} />
  </div>
)

export const LoadingMore = () => <CircularProgress />
