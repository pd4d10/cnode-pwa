import React from 'react'
import { CircularProgress } from 'material-ui'
import style from './loading.css'

const Loading = () => (
  <div className={style.container}>
    <CircularProgress />
  </div>
)

export default Loading
