import * as types from '../actions/login'

export default function login(state = {}, action) {
  switch (action.type) {
    case types.LOGIN_START:
      return state.set('isLoading', true)
    case types.LOGIN_SUCCESS:
      return state.set('isLoading', false)
        .set('isVisible', false)
        .set('token', action.token)
        .set('name', action.name)
        .set('avatar', action.avatar)
    case types.SHOW_LOGIN:
      return state.set('isVisible', true)
    case types.HIDE_LOGIN:
      return state.set('isVisible', false)
    case types.INPUT_TOKEN:
      return state.set('input', action.value)
    default:
      return state
  }
}
