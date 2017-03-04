import {
  SHOW_DRAWER,
  HIDE_DRAWER,
} from '../actions/drawer'
import { FETCH_TOPICS_START } from '../actions/list'

export default function list(state = {
  isVisible: false,
}, action) {
  switch (action.type) {
    case SHOW_DRAWER:
      return state.set('isVisible', true)
    case HIDE_DRAWER:
    case FETCH_TOPICS_START:
      return state.set('isVisible', false)
    default:
      return state
  }
}
