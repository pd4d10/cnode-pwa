import {
  SHOW_DRAWER,
  HIDE_DRAWER,
} from '../actions/drawer'

export default function list(state = {
  isVisible: false,
}, action) {
  switch (action.type) {
    case SHOW_DRAWER:
      return state.set('isVisible', true)
    case HIDE_DRAWER:
      return state.set('isVisible', false)
    default:
      return state
  }
}
