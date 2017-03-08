import * as userTypes from '../actions/user'

export default function user(state = {
  isLoading: false,
  data: null,
}, action) {
  switch (action.type) {
    case userTypes.LOAD_START:
      return state.set('isLoading', true)
    case userTypes.LOAD_SUCCESS:
      return state
        .set('isLoading', false)
        .set('data', action.data)
    case userTypes.LOAD_FAIL:
      return state.set('isLoading', false)
    default:
      return state
  }
}
