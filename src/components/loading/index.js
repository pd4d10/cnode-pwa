import React from 'react'
// import { fill } from 'lodash'
import CircularProgress from 'material-ui/CircularProgress'
import { colors } from '../../utils'
import style from './loading.css'

const Loading = () => (
  <div className={style.container}>
    <CircularProgress color={colors.primary} />
  </div>
)

/* const arr = fill(Array(10), 0)

const Loading = () => (
  <div>
    {arr.map((x, i) => (
      <div className={style.container} key={i}>
        <div className={style.avatar} />
        <div className={style.content}>
          <div className={style.title} />
          <div className={style.extra}>
            <div className={style.left} />
            <div className={style.right} />
          </div>
        </div>
      </div>
    ))}
  </div>
)*/

export default Loading
