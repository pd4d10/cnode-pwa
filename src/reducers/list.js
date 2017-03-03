import {
  FETCH_TOPICS_START,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAIL,
} from '../actions/list'

export default function list(state = {
  topics: [],
}, action) {
  switch (action.type) {
    case FETCH_TOPICS_START:
      return state.set('isFetching', true)
    case FETCH_TOPICS_SUCCESS:
      return state.set('topics', action.topics)
    case FETCH_TOPICS_FAIL:
      return state.set('isFetching', false)
    default:
      return state
  }
}
