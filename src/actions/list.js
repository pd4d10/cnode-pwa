import { push } from 'react-router-redux'
import { API_PREFIX } from '../utils'

export const FETCH_TOPICS_START = 'FETCH_TOPICS_START'
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS'
export const FETCH_TOPICS_FAIL = 'FETCH_TOPICS_FAIL'

export const fetchTopics = (tab = 'all') => async (dispatch, getState) => {
  dispatch({
    type: FETCH_TOPICS_START,
  })

  try {
    const query = `?tab=${tab}`
    const res = await fetch(`${API_PREFIX}/topics${query}`)
    const { data } = await res.json()
    dispatch(({
      type: FETCH_TOPICS_SUCCESS,
      topics: data,
      tab,
    }))

    // If tab switched, push a new URL
    if (getState().routing.locationBeforeTransitions.query.tab !== tab) {
      dispatch(push(`/${query}`))
    }
  } catch (err) {
    dispatch({
      type: FETCH_TOPICS_FAIL,
      err,
    })
  }
}
