import {
  LOGIN_START,
  LOGIN_SUCCESS,
  // LOGIN_FAIL,
} from '../actions/login'

export default function login(state = {}, action) {
  switch (action.type) {
    case LOGIN_START:
      return state.set('isFetching', true)
    case LOGIN_SUCCESS:
      return state.set('isFetching', false)
        .set('token', action.token)
        .set('name', action.name)
        .set('avatar', action.avatar)
    default:
      return state
  }
}
