import * as listTypes from '../actions/list'

export default function list(state = {
  isLoading: false,
  topics: [],
}, action) {
  switch (action.type) {
    case listTypes.LOAD_START:
      return state.set('isLoading', true)
    case listTypes.LOAD_SUCCESS:
      return state.set('topics', action.topics)
        .set('isLoading', false)
    case listTypes.LOAD_FAIL:
      return state.set('isLoading', false)
    default:
      return state
  }
}
