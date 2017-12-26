import { fetchAPI, tabsMap } from '../utils'

export const LOAD_START = 'LIST/LOAD_START'
export const LOAD_SUCCESS = 'LIST/LOAD_SUCCESS'
export const LOAD_FAIL = 'LIST/LOAD_FAIL'
export const LOAD_MORE_START = 'LIST/LOAD_MORE_START'
export const LOAD_MORE_SUCCESS = 'LIST/LOAD_MORE_SUCCESS'
export const LOAD_MORE_FAIL = 'LIST/LOAD_MORE_FAIL'

const tabs = Object.keys(tabsMap)

function getCorrectTab(tab) {
  if (tabs.includes(tab)) {
    return tab
  }

  return 'all'
}

export const load = (tab = 'all') => async (dispatch, getState) => {
  dispatch({
    type: LOAD_START,
  })
  try {
    const { data } = await fetchAPI(
      `/topics?tab=${getCorrectTab(tab)}&limit=20`
    )
    dispatch({
      type: LOAD_SUCCESS,
      data,
    })
  } catch (err) {
    dispatch({
      type: LOAD_FAIL,
      message: err.message,
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
    const { data } = await fetchAPI(
      `/topics?tab=${getCorrectTab(tab)}&page=${page}&limit=20`
    )
    dispatch({
      type: LOAD_MORE_SUCCESS,
      data,
    })
  } catch (err) {
    dispatch({
      type: LOAD_MORE_FAIL,
      err,
    })
  }
}
