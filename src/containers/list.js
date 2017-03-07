import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { AppBar, Drawer, Divider, List, ListItem, FloatingActionButton } from 'material-ui'
import ContentCreate from 'material-ui/svg-icons/content/create'
import { fetchTopics } from '../actions/list'
import { showDrawer, hideDrawer } from '../actions/drawer'
import Topic from '../components/topic'
import Loading from '../components/loading'
import style from './list.css'
import { tabs, tabsMap } from '../utils'

class ListComponent extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopics(this.props.location.query.tab))
  }

  render() {
    const { props } = this
    return (
      <div className={style.container}>
        <AppBar
          title={props.title}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={() => props.dispatch(showDrawer())}
        />
        <Drawer
          docked={false}
          width={200}
          open={props.isVisible}
          onRequestChange={() => props.dispatch(hideDrawer())}
        >
          <List style={{ marginTop: '40px' }}>
            {tabs.map(tab => (
              <ListItem
                primaryText={tab.value}
                onClick={() => props.dispatch(fetchTopics(tab.key))}
                key={tab.key}
              />
            ))}
            <Divider />
            <ListItem primaryText="消息" />
            <ListItem primaryText="关于" />
          </List>
        </Drawer>
        {props.isFetching ? <Loading /> : (
          <ul>
            {props.topics.map(topic => (
              <li key={topic.id}>
                <Topic {...topic} />
              </li>
            ))}
          </ul>
        )}
        <FloatingActionButton className={style.post}>
          <ContentCreate />
        </FloatingActionButton>
      </div>
    )
  }
}

ListComponent.propTypes = {
  // topics: PropTypes.arrayOf(PropTypes.object).isRequired,
  // isFetching: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      tab: PropTypes.string,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  isVisible: state.drawer.isVisible,
  title: tabsMap[state.routing.locationBeforeTransitions.query.tab],
  isFetching: state.list.isFetching,
  topics: state.list.topics,
})


export default connect(mapStateToProps)(ListComponent)
