import { fetchAPI } from '../utils'

export const LOAD_START = 'DETAIL/LOAD_START'
export const LOAD_SUCCESS = 'DETAIL/LOAD_SUCCESS'
export const LOAD_FAIL = 'DETAIL/LOAD_FAIL'

const loadStart = () => ({
  type: LOAD_START,
})

const loadSuccess = topic => ({
  type: LOAD_SUCCESS,
  topic,
})

const loadFail = err => ({
  type: LOAD_FAIL,
  message: err.message,
})

export const fetchTopic = id => async dispatch => {
  dispatch(loadStart())
  try {
    const { data } = await fetchAPI(`/topic/${id}`)
    dispatch(loadSuccess(data))
  } catch (err) {
    dispatch(loadFail(err))
  }
}
