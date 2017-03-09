import { push } from 'react-router-redux'
import { showLogin } from './login'
import { fetchAPI } from '../utils'

export const LOAD_START = 'MESSAGE/LOAD_START'
export const LOAD_SUCCESS = 'MESSAGE/LOAD_SUCCESS'

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

  const json = await fetchAPI(`/messages?accesstoken=${token}`)

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
