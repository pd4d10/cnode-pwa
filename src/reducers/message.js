import * as types from '../actions/message'

export default function message(state = {}, action) {
  switch (action.type) {
    case types.LOAD_START:
      return state.set('isLoading', true)
    case types.LOAD_SUCCESS:
      return state.set('isLoading', false)
        .set('has_read_messages', action.has_read_messages)
        .set('hasnot_read_messages', action.hasnot_read_messages)
    default:
      return state
  }
}
