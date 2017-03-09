import React from 'react'
import { CircularProgress } from 'material-ui'
import { green500 } from 'material-ui/styles/colors'
import style from './loading-more.css'

const LoadingMore = () => (
  <div className={style.container}>
    <CircularProgress color={green500} />
  </div>
)

export default LoadingMore
