import { push } from 'react-router-redux'
import * as authActions from './auth'
import { fetchAPI } from '../utils'

export const LOAD_START = 'MESSAGE/LOAD_START'
export const LOAD_SUCCESS = 'MESSAGE/LOAD_SUCCESS'

// const loadSuccess = data => ({
//   type: LOAD_SUCCESS,
//   ...data,
// })

export const loadMessage = token => async (dispatch) => {
  const json = await fetchAPI(`/messages?accesstoken=${token}`)
  const { has_read_messages, hasnot_read_messages } = json.data
  dispatch({
    type: LOAD_SUCCESS,
    has_read_messages,
    hasnot_read_messages,
  })
  dispatch(push('/messages'))
}

export const load = () => async (dispatch, getState) => {
  dispatch({
    type: LOAD_START,
  })

  const { token } = getState().auth

  // If there is no token, show login popup and exit
  if (!token) {
    dispatch(authActions.showLogin())
    return
  }

  try {
    dispatch(loadMessage(token))
  } catch (err) {
    // Fail, show login popup
    dispatch(authActions.showLogin())
  }
}
