import React from 'react'
// import { fill } from 'lodash'
import CircularProgress from 'material-ui/CircularProgress'
import { colors } from '../../utils'
import styled from 'styled-components'

const Container = styled.div`
 position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -20px;
`

const Unused = styled.div`
.container {
  padding: 16px;
  display: flex;
}

.avatar {
      flex-basis: 48px;
    height: 48px;
    margin-right: 10px;
    border-radius: 50%;
    background: #eee;
}

.content {
   display: flex;
  min-width: 0;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  height: 48px;
}

.title {
      height: 20px;
    background: #eee;
}

.extra {
    display: flex;
  align-items: center;
  justify-content: space-between;
margin-bottom: 6px;
}

.left {
  background: #eee;
    width: 100px;
    height: 10px;
}

.right {
    height: 10px;
    width: 50px;
    background: #eee;
}
`

const Loading = () => (
  <Container>
    <CircularProgress color={colors.primary} />
  </Container>
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
