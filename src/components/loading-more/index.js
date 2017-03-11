import React from 'react'
import { CircularProgress } from 'material-ui'
import { colors } from '../../utils'
import style from './loading-more.css'

const LoadingMore = () => (
  <div className={style.container}>
    <CircularProgress color={colors.primary} />
  </div>
)

export default LoadingMore
