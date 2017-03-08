import * as detailTypes from '../actions/detail'

export default function list(state = {
  isLoading: false,
  topic: null,
}, action) {
  switch (action.type) {
    case detailTypes.LOAD_START:
      return state.set('isLoading', true)
    case detailTypes.LOAD_SUCCESS:
      return state.set('topic', action.topic)
        .set('isLoading', false)
    case detailTypes.LOAD_FAIL:
      return state.set('isLoading', false)
    default:
      return state
  }
}
