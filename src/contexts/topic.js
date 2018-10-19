import React from 'react'
import { withRouter } from 'react-router-dom'
import { fetchAPI, getCurrentTab } from '../utils'

const { Consumer, Provider } = React.createContext()

export const TopicConsumer = Consumer

export class TopicProvider extends React.Component {
  state = {
    isLoading: false,
    isLoadingMore: false,
    topics: [],
    page: 1,
  }

  fetchTopics = async page => {
    const tab = getCurrentTab(this.props.location)
    const { data } = await fetchAPI(`/topics?tab=${tab}&page=${page}&limit=20`)
    return data
  }

  load = async () => {
    try {
      const page = 1
      this.setState({ isLoading: true })
      const topics = await this.fetchTopics(page)
      this.setState({ topics, page })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  loadMore = async () => {
    try {
      const page = this.state.page + 1
      this.setState({ isLoadingMore: true })
      const topics = await this.fetchTopics(page)
      this.setState({ topics: [...this.state.topics, ...topics], page })
    } finally {
      this.setState({ isLoadingMore: false })
    }
  }

  render() {
    const { isLoading, isLoadingMore, topics } = this.state
    const { load, loadMore } = this

    return (
      <Provider
        value={{
          topics,
          isLoading,
          isLoadingMore,
          load,
          loadMore,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

TopicProvider = withRouter(TopicProvider)
