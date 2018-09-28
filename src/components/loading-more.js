import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../utils'
import styled, { css } from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  ${props =>
    props.isVisible ||
    css`
      visibility: hidden;
    `};
`

const LoadingMore = props => <Container />

LoadingMore.propTypes = {
  isVisible: PropTypes.bool.isRequired,
}

export default LoadingMore
