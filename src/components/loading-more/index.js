import React, { PropTypes } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { colors } from '../../utils'
import style from './loading-more.css'

const LoadingMore = props => (
  <div className={style.container} style={props.isVisible ? {} : { visibility: 'hidden' }}>
    <CircularProgress color={colors.primary} />
  </div>
)

LoadingMore.propTypes = {
  isVisible: PropTypes.bool.isRequired,
}

export default LoadingMore
