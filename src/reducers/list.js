import * as types from '../actions/list'

export default function list(state = {
  isLoading: false,
  isLoadingMore: false,
  page: 1,
  topics: [],
}, action) {
  switch (action.type) {
    case types.LOAD_START:
      return {
        ...state,
        isLoading: true,
      }
    case types.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        topics: action.data,
      }
    case types.LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case types.LOAD_MORE_START:
      return {
        ...state,
        isLoadingMore: true,
      }
    case types.LOAD_MORE_SUCCESS:
      return {
        ...state,
        isLoadingMore: false,
        topics: [...state.topics, ...action.data],
      }
    default:
      return state
  }
}
