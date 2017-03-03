import React, { PropTypes } from 'react'

const Reply = props => (
  <div>
    <img src={props.author.avatar_url} alt={props.author.loginname} />
    <div dangerouslySetInnerHTML={{ __html: props.content }} />
  </div>
)

Reply.propTypes = {
  author: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    loginname: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.string.isRequired,
}

export default Reply
