import React from 'react'
import { CircularProgress } from 'material-ui'
import { green500 } from 'material-ui/styles/colors'
import style from './loading.css'

const Loading = () => (
  <div className={style.container}>
    <CircularProgress color={green500} />
  </div>
)

export default Loading
