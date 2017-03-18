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
        page: 1, // Reset page
        topics: action.data,
      }
    case types.LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        topics: [],
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
        page: state.page + 1,
        topics: [...state.topics, ...action.data],
      }
    default:
      return state
  }
}
