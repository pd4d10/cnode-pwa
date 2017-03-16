import { push } from 'react-router-redux'
import { fetchAPI } from '../utils'

export const LOAD_START = 'LIST/LOAD_START'
export const LOAD_SUCCESS = 'LIST/LOAD_SUCCESS'
export const LOAD_FAIL = 'LIST/LOAD_FAIL'
export const LOAD_MORE_START = 'LIST/LOAD_MORE_START'
export const LOAD_MORE_SUCCESS = 'LIST/LOAD_MORE_SUCCESS'
export const LOAD_MORE_FAIL = 'LIST/LOAD_MORE_FAIL'

export const load = (tab = 'all') => async (dispatch, getState) => {
  dispatch({
    type: LOAD_START,
  })

  try {
    // If tab switched, push a new URL
    if (getState().routing.locationBeforeTransitions.query.tab !== tab) {
      dispatch(push(`/?tab=${tab}`))
    }

    const { data } = await fetchAPI(`/topics?tab=${tab}&limit=20`)
    dispatch(({
      type: LOAD_SUCCESS,
      data,
      tab,
    }))
  } catch (err) {
    dispatch({
      type: LOAD_FAIL,
      err,
    })
  }
}

export const loadMore = () => async (dispatch, getState) => {
  dispatch({
    type: LOAD_MORE_START,
  })

  try {
    const state = getState()
    const page = state.list.page + 1
    const { tab } = state.routing.locationBeforeTransitions.query
    const { data } = await fetchAPI(`/topics?tab=${tab}&page=${page}&limit=20`)
    dispatch(({
      type: LOAD_MORE_SUCCESS,
      data,
    }))
  } catch (err) {
    dispatch({
      type: LOAD_MORE_FAIL,
      err,
    })
  }
}
