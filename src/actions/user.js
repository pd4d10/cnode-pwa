import { API_PREFIX } from '../utils'

export const FETCH_USER_START = 'FETCH_USER_START'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL'

export const fetchUser = name => async (dispatch) => {
  dispatch({
    type: FETCH_USER_START,
  })

  try {
    const res = await fetch(`${API_PREFIX}/v1/user/${name}`)
    const { data } = await res.json()
    dispatch({
      type: FETCH_USER_SUCCESS,
      data,
    })
  } catch (err) {
    // dispatch({})
  }
}
