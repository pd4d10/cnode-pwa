import * as detailTypes from '../actions/detail'

export default function list(state = {
  isLoading: false,
}, action) {
  switch (action.type) {
    case detailTypes.LOAD_START:
      return {
        ...state,
        isLoading: true,
      }
    case detailTypes.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        topic: action.topic,
      }
    case detailTypes.LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
