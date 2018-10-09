import * as types from '../actions/auth'

export default function login(
  state = {
    input: '',
    isLoading: false,
    isVisible: false,
  },
  action,
) {
  switch (action.type) {
    case types.LOGIN_START:
      return {
        ...state,
        isLoading: true,
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isVisible: false,
        token: action.token,
        name: action.name,
        avatar: action.avatar,
      }
    case types.SHOW_LOGIN:
      return {
        ...state,
        isVisible: true,
      }
    case types.HIDE_LOGIN:
      return {
        ...state,
        isVisible: false,
      }
    case types.INPUT_TOKEN:
      return {
        ...state,
        input: action.value,
      }
    default:
      return state
  }
}
