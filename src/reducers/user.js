import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from '../actions/user'

export default function user(state = {
  isFetching: false,
  data: null,
}, action) {
  switch (action.type) {
    case FETCH_USER_START:
      return state.set('isFetching', true)
    case FETCH_USER_SUCCESS:
      return state
        .set('isFetching', false)
        .set('data', action.data)
    case FETCH_USER_FAIL:
      return state.set('isFetching', false)
    default:
      return state
  }
}
