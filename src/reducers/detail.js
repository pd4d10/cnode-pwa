import * as detailTypes from '../actions/detail'

export default function list(state = {
  isFetching: false,
  topic: null,
}, action) {
  switch (action.type) {
    case detailTypes.LOAD_START:
      return state.set('isFetching', true)
    case detailTypes.LOAD_SUCCESS:
      return state.set('topic', action.topic)
        .set('isFetching', false)
    case detailTypes.LOAD_FAIL:
      return state.set('isFetching', false)
    default:
      return state
  }
}
