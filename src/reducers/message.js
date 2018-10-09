import * as types from '../actions/message'

export default function message(
  state = {
    isLoading: false,
    hasnot_read_messages: [],
    has_read_messages: [],
  },
  action,
) {
  switch (action.type) {
    case types.LOAD_START:
      return {
        ...state,
        isLoading: true,
      }
    case types.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        has_read_messages: action.has_read_messages,
        hasnot_read_messages: action.hasnot_read_messages,
      }
    default:
      return state
  }
}
