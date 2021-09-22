import React from 'react'
import { CircularProgress } from '@mui/material'

export const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      padding: 24,
    }}
  >
    <CircularProgress size={36} />
  </div>
)

export const LoadingMore = () => <CircularProgress />
