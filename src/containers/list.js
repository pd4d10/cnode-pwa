import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { compose, pick } from 'lodash/fp'
import { Tabs, Tab } from 'material-ui'
import { fetchTopics, changeTab } from '../actions/list'
import Topic from '../components/topic'

const mapStateToProps = state => ({
  topics: state.list.topics,
})

class List extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopics())
  }

  render() {
    const { topics, dispatch } = this.props
    const tabs = [
      { label: '全部', value: 'all' },
      { label: '精华', value: 'good' },
      { label: '分享', value: 'share' },
      { label: '问答', value: 'ask' },
      { label: '招聘', value: 'job' },
    ]

    return (
      <div>
        <Tabs>
          {tabs.map(tab => (
            <Tab
              {...tab}
              key={tab.value}
              onActive={t => dispatch(changeTab(t.props.value))}
            />
          ))}
        </Tabs>
        {topics.map(topic => <Topic {...topic} key={topic.id} />)}
      </div>
    )
  }
}

List.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(List)
