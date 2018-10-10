import React from 'react'
import { withRouter } from 'react-router-dom'
import { fetchAPI } from '../utils'

const { Consumer, Provider } = React.createContext()

export const ListConsumer = Consumer

export const withList = Component => props => (
  <Consumer>{params => <Component {...props} {...params} />}</Consumer>
)

class ListProvider extends React.Component {
  state = {
    isLoading: false,
    isLoadingMore: false,
    topics: [],
    page: 1,
  }

  getCorrectTab = () => {
    const { pathname } = this.props.location
    if (['/good', '/share', '/ask', '/job'].includes(pathname)) {
      return pathname.slice(1)
    } else {
      return 'all'
    }
  }

  fetchTopics = async page => {
    const tab = this.getCorrectTab()
    const { data } = await fetchAPI(`/topics?tab=${tab}&page=${page}&limit=20`)
    return data
  }

  load = async () => {
    try {
      const page = 1
      this.setState({ isLoading: true })
      const data = await this.fetchTopics(page)
      this.setState({ topics: data, page })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  loadMore = async () => {
    try {
      const page = this.state.page + 1
      this.setState({ isLoadingMore: true })
      const data = await this.fetchTopics(page)
      this.setState({
        topics: [...this.state.topics, ...data],
        page,
      })
    } finally {
      this.setState({ isLoadingMore: false })
    }
  }

  render() {
    const { isLoading, isLoadingMore, topics } = this.state
    const { load, loadMore } = this
    return (
      <Provider value={{ isLoading, isLoadingMore, topics, load, loadMore }}>
        {this.props.children}
      </Provider>
    )
  }
}

ListProvider = withRouter(ListProvider)
export { ListProvider }
