import { API_PREFIX } from '../utils'

export const LOAD_START = 'USER/LOAD_START'
export const LOAD_SUCCESS = 'USER/LOAD_SUCCESS'
export const LOAD_FAIL = 'USER/LOAD_FAIL'

export const fetchUser = name => async (dispatch) => {
  dispatch({
    type: LOAD_START,
  })

  try {
    const res = await fetch(`${API_PREFIX}/user/${name}`)
    const { data } = await res.json()
    dispatch({
      type: LOAD_SUCCESS,
      data,
    })
  } catch (err) {
    // dispatch({})
  }
}
