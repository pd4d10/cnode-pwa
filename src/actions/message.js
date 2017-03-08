import { showLogin } from './login'
import { API_PREFIX } from '../utils'
import { push } from 'react-router-redux'

export const LOAD_START = 'FETCH_MESSAGE_START'
export const LOAD_SUCCESS = 'FETCH_MESSAGE_SUCCESS'

export const load = () => async (dispatch, getState) => {
  const { token } = getState().login

  // If there is no token, show login popup
  if (!token) {
    dispatch(showLogin())
    return
  }

  dispatch({
    type: LOAD_START,
  })

  const res = await fetch(`${API_PREFIX}/messages?accesstoken=${token}`)
  const json = await res.json()

  // Fail, show login popup
  if (!json.success) {
    dispatch(showLogin())
    return
  }

  const { has_read_messages, hasnot_read_messages } = json.data
  dispatch(push('/messages'))
  dispatch({
    type: LOAD_SUCCESS,
    has_read_messages,
    hasnot_read_messages,
  })
}
