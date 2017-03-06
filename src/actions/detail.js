import { API_PREFIX } from '../utils'

export const FETCH_TOPIC_START = 'FETCH_TOPIC_START'
export const FETCH_TOPIC_SUCCESS = 'FETCH_TOPIC_SUCCESS'
export const FETCH_TOPIC_FAIL = 'FETCH_TOPIC_FAIL'

const fetchStart = () => ({
  type: FETCH_TOPIC_START,
})

const fetchSuccess = topic => ({
  type: FETCH_TOPIC_SUCCESS,
  topic,
})

const fetchFail = err => ({
  type: FETCH_TOPIC_FAIL,
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
