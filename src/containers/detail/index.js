import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TimeAgo from 'timeago-react'

import Container from '../../components/container'
import { fetchTopic } from '../../actions/detail'
import Reply from '../../components/reply'
import Loading from '../../components/loading'
import style from './detail.css'
import markdownStyle from './github-markdown.css'

const mapStateToProps = state => state.detail

class Detail extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopic(this.props.params.id))
  }

  render() {
    const { props } = this
    return (
      <Container title="话题">
        <div className={style.container}>
          {(props.isLoading || !props.topic) ? <Loading /> : (
            <div>
              <h2 className={style.title}>{props.topic.title}</h2>
              <div className={style.info}>
                <Link to={`/user/${props.topic.author.loginname}`} className={style.avatar}>
                  <img src={props.topic.author.avatar_url} alt={props.topic.author.loginnam} />
                </Link>
                <div className={style.extra}>
                  <div>{props.topic.author.loginname}</div>
                  <div className={style.time}>
                    <span>
                      创建于
                      <TimeAgo
                        datetime={props.topic.create_at}
                        locale="zh_CN"
                        live={false}
                      />
                    </span>
                    <span style={{ marginLeft: '6px' }}>
                      {props.topic.visit_count}
                      次浏览
                    </span>
                  </div>
                </div>
              </div>
              <div className={markdownStyle.markdownBody} dangerouslySetInnerHTML={{ __html: props.topic.content }} />
              <div>
                <div className={style.replyHeader}>共 {props.topic.reply_count} 条回复</div>
                {props.topic.replies.map(reply => (
                  <Reply {...reply} key={reply.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    )
  }
}

Detail.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  topic: PropTypes.shape({ // eslint-disable-line
    content: PropTypes.string.isRequired,
  }),
}

export default connect(mapStateToProps)(Detail)
