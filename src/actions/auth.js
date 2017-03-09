import { fetchAPI } from '../utils'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const SHOW_LOGIN = 'SHOW_LOGIN'
export const HIDE_LOGIN = 'HIDE_LOGIN'
export const INPUT_TOKEN = 'INPUT_TOKEN'

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

const loginStart = () => ({
  type: LOGIN_START,
})

const loginSuccess = (token, json) => ({
  type: LOGIN_SUCCESS,
  token,
  name: json.loginname,
  avatar: json.avatar_url,
})

async function fetchAuth(token) {
  const json = await fetchAPI('/accesstoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `accesstoken=${token}`,
  })
  return json
}

// Check auth state at app loaded
export const load = () => async (dispatch, getState) => {
  const { token } = getState().auth

  // If there is no token, exit
  if (!token) return

  try {
    const json = await fetchAuth(token)
    dispatch(loginSuccess(token, json))
  } catch (err) {
    //
  }
}

// // Check if current token is correct
// export const auth = () => async (dispatch, getState) => {
//   const { token } = getState().auth

//   // If there is no token, show login popup
//   if (!token) {
//     dispatch(showLogin())
//     return
//   }

//   try {
//     const json = await fetchAuth(token)
//     dispatch(loginSuccess(token, json))
//   } catch (err) {
//     dispatch(showLogin())
//   }
// }

export const login = () => async (dispatch, getState) => {
  dispatch(loginStart())
  const token = getState().auth.input

  try {
    const json = await fetchAuth(token)
    dispatch(loginSuccess(token, json))
  } catch (err) {
    //
  }
}
