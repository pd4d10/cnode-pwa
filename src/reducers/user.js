import * as userTypes from '../actions/user'

export default function user(
  state = {
    isLoading: false,
  },
  action,
) {
  switch (action.type) {
    case userTypes.LOAD_START:
      return {
        ...state,
        isLoading: true,
      }
    case userTypes.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
      }
    case userTypes.LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
