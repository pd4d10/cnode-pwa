import * as toastTypes from '../actions/toast'
// import * as authTypes from '../actions/auth'

export default function toast(state = {
  isVisible: false,
  message: '',
  feature: '',
}, action) {
  switch (action.type) {
    case toastTypes.SHOW_TOAST:
    // case authTypes.LOGIN_SUCCESS:
    // case authTypes.LOGIN_FAIL:
      return {
        ...state,
        isVisible: true,
        // message: action.message,
        feature: action.feature,
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
