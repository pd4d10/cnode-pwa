import {
  FETCH_TOPIC_START,
  FETCH_TOPIC_SUCCESS,
  FETCH_TOPIC_FAIL,
} from '../actions/detail'

export default function list(state = {
  isFetching: false,
  topic: null,
}, action) {
  switch (action.type) {
    case FETCH_TOPIC_START:
      return state.set('isFetching', true)
    case FETCH_TOPIC_SUCCESS:
      return state.set('topic', action.topic)
        .set('isFetching', false)
    case FETCH_TOPIC_FAIL:
      return state.set('isFetching', false)
    default:
      return state
  }
}
