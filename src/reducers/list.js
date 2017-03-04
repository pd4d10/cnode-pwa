import {
  FETCH_TOPICS_START,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAIL,
  CHANGE_TAB_FETCH_SUCCESS,
} from '../actions/list'

export default function list(state = {
  isFetching: false,
  topics: [],
  activeTab: 'all',
}, action) {
  switch (action.type) {
    case FETCH_TOPICS_START:
      return state.set('isFetching', true)
    case FETCH_TOPICS_SUCCESS:
      return state.set('topics', action.topics)
    case FETCH_TOPICS_FAIL:
      return state.set('isFetching', false)
    case CHANGE_TAB_FETCH_SUCCESS:
      return state.set('activeTab', action.tab)
        .set('topics', action.topics)
    default:
      return state
  }
}
