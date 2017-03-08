import { push } from 'react-router-redux'
import { API_PREFIX } from '../utils'

export const LOAD_START = 'LIST/LOAD_START'
export const LOAD_SUCCESS = 'LIST/LOAD_SUCCESS'
export const LOAD_FAIL = 'LIST/LOAD_FAIL'

export const load = (tab = 'all') => async (dispatch, getState) => {
  dispatch({
    type: LOAD_START,
  })

  try {
    // If tab switched, push a new URL
    if (getState().routing.locationBeforeTransitions.query.tab !== tab) {
      dispatch(push(`/?tab=${tab}`))
    }

    const res = await fetch(`${API_PREFIX}/topics?tab=${tab}`)
    const { data } = await res.json()
    dispatch(({
      type: LOAD_SUCCESS,
      topics: data,
      tab,
    }))
  } catch (err) {
    dispatch({
      type: LOAD_FAIL,
      err,
    })
  }
}
