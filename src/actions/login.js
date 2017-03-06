import { API_PREFIX } from '../utils'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const login = token => async (dispatch) => {
  dispatch({
    type: LOGIN_START,
  })

  const res = await fetch(`${API_PREFIX}/accesstoken`, {
    method: 'POST',
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
