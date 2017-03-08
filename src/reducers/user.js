import * as userTypes from '../actions/user'

export default function user(state = {
  isFetching: false,
  data: null,
}, action) {
  switch (action.type) {
    case userTypes.LOAD_START:
      return state.set('isFetching', true)
    case userTypes.LOAD_SUCCESS:
      return state
        .set('isFetching', false)
        .set('data', action.data)
    case userTypes.LOAD_FAIL:
      return state.set('isFetching', false)
    default:
      return state
  }
}
