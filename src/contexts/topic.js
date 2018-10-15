import React from 'react'
import { withRouter } from 'react-router-dom'
import { fetchAPI, tabs } from '../utils'

const { Consumer, Provider } = React.createContext()

export const TopicConsumer = Consumer

export class TopicProvider extends React.Component {
  state = {
    isLoading: false,
    isLoadingMore: false,
    topicMapper: {},
    topics: [[], [], [], [], []],
    pages: [1, 1, 1, 1, 1],
    scrollYs: [0, 0, 0, 0, 0],
  }

  getCurrentTab = () => {
    const params = new URLSearchParams(this.props.location.search)
    return params.get('tab') || 'all'
  }

  getCurrentIndex = () => tabs.indexOf(this.getCurrentTab())

  fetchTopics = async page => {
    const tab = this.getCurrentTab()
    const { data } = await fetchAPI(`/topics?tab=${tab}&page=${page}&limit=20`)
    const topicMapper = {}
    data.forEach(item => {
      topicMapper[item.id] = item
    })
    this.setState({
      topicMapper: { ...this.state.topicMapper, ...topicMapper },
    })
    return data
  }

  setScrollY = position => {
    const scrollYs = this.state.scrollYs.slice()
    const current = tabs.indexOf(this.getCurrentTab())
    scrollYs[current] = position
    this.setState({ scrollYs })
  }

  load = async () => {
    const index = this.getCurrentIndex()
    const topics = this.state.topics.slice()
    const pages = this.state.pages.slice()

    try {
      const page = 1
      this.setState({ isLoading: true })
      const data = await this.fetchTopics(page)
      pages[index] = page
      topics[index] = data

      this.setState({ topics, pages })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  loadMore = async () => {
    const index = this.getCurrentIndex()
    const topics = this.state.topics.slice()
    const pages = this.state.pages.slice()

    try {
      const page = pages[index] + 1
      this.setState({ isLoadingMore: true })
      const data = await this.fetchTopics(page)
      pages[index] = page
      topics[index] = [...topics[index], ...data]

      this.setState({ topics, pages })
    } finally {
      this.setState({ isLoadingMore: false })
    }
  }

  render() {
    const index = this.getCurrentIndex()
    const { isLoading, isLoadingMore, topicMapper } = this.state
    const { load, loadMore, setScrollY } = this
    const topics = this.state.topics[index]
    const scrollY = this.state.scrollYs[index]

    return (
      <Provider
        value={{
          topics,
          scrollY,
          isLoading,
          isLoadingMore,
          load,
          loadMore,
          setScrollY,
          currentIndex: index,
          topicMapper,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

TopicProvider = withRouter(TopicProvider)
