import * as listTypes from '../actions/list'

export default function list(state = {
  isFetching: false,
  topics: [],
}, action) {
  switch (action.type) {
    case listTypes.LOAD_START:
      return state.set('isFetching', true)
    case listTypes.LOAD_SUCCESS:
      return state.set('topics', action.topics)
        .set('isFetching', false)
    case listTypes.LOAD_FAIL:
      return state.set('isFetching', false)
    default:
      return state
  }
}
