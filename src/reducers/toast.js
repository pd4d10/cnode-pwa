import * as toastTypes from '../actions/toast'
import * as authTypes from '../actions/auth'

export default function toast(state = {
  isVisible: false,
  message: '',
}, action) {
  switch (action.type) {
    case toastTypes.SHOW_TOAST:
    case authTypes.LOGIN_SUCCESS:
    case authTypes.LOGIN_FAIL:
      return {
        ...state,
        isVisible: true,
        message: action.message,
      }
    case toastTypes.HIDE_TOAST:
      return {
        ...state,
        isVisible: false,
      }
    default:
      return state
  }
}
