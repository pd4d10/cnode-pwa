import React, { PropTypes } from 'react'
import { CircularProgress } from 'material-ui'
import { colors } from '../../utils'
import style from './loading-more.css'

const LoadingMore = props => (
  <div className={style.container} style={props.isVisible ? {} : { display: 'none' }}>
    <CircularProgress color={colors.primary} />
  </div>
)

LoadingMore.propTypes = {
  isVisible: PropTypes.bool.isRequired,
}

export default LoadingMore
