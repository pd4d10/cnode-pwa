import { API_PREFIX } from '../utils'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const SHOW_LOGIN = 'SHOW_LOGIN'
export const HIDE_LOGIN = 'HIDE_LOGIN'
export const INPUT_TOKEN = 'INPUT_TOKEN'

export const login = () => async (dispatch, getState) => {
  dispatch({
    type: LOGIN_START,
  })

  const token = getState().login.input

  const res = await fetch(`${API_PREFIX}/accesstoken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `accesstoken=${token}`,
  })
  const json = await res.json()

  if (!json.success) {
    return
  }

  dispatch({
    type: LOGIN_SUCCESS,
    token,
    name: json.loginname,
    avatar: json.avatar_url,
  })
}

export const inputToken = value => ({
  type: INPUT_TOKEN,
  value,
})

export const showLogin = () => ({
  type: SHOW_LOGIN,
})

export const hideLogin = () => ({
  type: HIDE_LOGIN,
})
