import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton } from 'material-ui'
import { goBack } from 'react-router-redux'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { fetchTopic } from '../../actions/detail'
import Reply from '../../components/reply'
import Loading from '../../components/loading'
import style from './detail.css'

const mapStateToProps = state => state.detail

class Detail extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopic(this.props.params.id))
  }

  render() {
    const { props } = this
    return (
      <div>
        <AppBar
          title="话题"
          iconElementLeft={<IconButton><ArrowBack /></IconButton>}
          onLeftIconButtonTouchTap={() => props.dispatch(goBack())}
        />
        {(props.isFetching || !props.topic) ? <Loading /> : (
          <div className={style.container}>
            <h2>{props.topic.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: props.topic.content }} />
            {props.topic.replies.map(reply => (
              <Reply {...reply} key={reply.id} />
              ))}
          </div>
          )}
      </div>
    )
  }
}

Detail.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  topic: PropTypes.shape({ // eslint-disable-line
    content: PropTypes.string.isRequired,
  }),
}

export default connect(mapStateToProps)(Detail)