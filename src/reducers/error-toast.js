import * as listTypes from '../actions/list'
import * as detailTypes from '../actions/detail'
import * as errorToastTypes from '../actions/error-toast'

export default function errorToast(
  state = {
    isVisible: false,
    message: '',
  },
  action,
) {
  switch (action.type) {
    case listTypes.LOAD_FAIL:
    case detailTypes.LOAD_FAIL:
      return {
        ...state,
        isVisible: true,
        message: action.message,
      }
    case listTypes.LOAD_START:
    case detailTypes.LOAD_START:
    case errorToastTypes.HIDE:
      return {
        ...state,
        isVisible: false,
      }
    default:
      return state
  }
}
