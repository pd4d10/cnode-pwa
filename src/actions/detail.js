import { API_PREFIX } from '../utils'

export const LOAD_START = 'DETAIL/LOAD_START'
export const LOAD_SUCCESS = 'DETAIL/LOAD_SUCCESS'
export const LOAD_FAIL = 'DETAIL/LOAD_FAIL'

const fetchStart = () => ({
  type: LOAD_START,
})

const fetchSuccess = topic => ({
  type: LOAD_SUCCESS,
  topic,
})

const fetchFail = err => ({
  type: LOAD_FAIL,
  err,
})

export const fetchTopic = id => async (dispatch) => {
  dispatch(fetchStart())
  // const id = getState().routing.id
  try {
    const res = await fetch(`${API_PREFIX}/topic/${id}`)
    const { data } = await res.json()
    dispatch(fetchSuccess(data))
  } catch (err) {
    dispatch(fetchFail(err))
  }
}
