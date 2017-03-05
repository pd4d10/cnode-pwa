// import { push } from 'react-router-redux'

export const FETCH_TOPICS_START = 'FETCH_TOPICS_START'
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS'
export const FETCH_TOPICS_FAIL = 'FETCH_TOPICS_FAIL'
export const CHANGE_TAB = 'CHANGE_TAB'

const fetchStart = () => ({
  type: FETCH_TOPICS_START,
})

const fetchFail = err => ({
  type: FETCH_TOPICS_FAIL,
  err,
})

export const fetchTopics = tab => async (dispatch) => {
  const requestTab = tab || 'all'
  const query = `?tab=${requestTab}`
  dispatch(fetchStart())

  try {
    const res = await fetch(`https://cnodejs.org/api/v1/topics${query}`)
    const { data } = await res.json()
    dispatch(({
      type: FETCH_TOPICS_SUCCESS,
      topics: data,
      tab: requestTab,
    }))

    // dispatch(push('/'))
  } catch (err) {
    dispatch(fetchFail(err))
  }
}

export const changeTab = value => async (dispatch, getState) => {
  const state = getState()

  // If clicked tab is already active, do nothing
  if (state.list.activeTab === value) {
    return
  }

  dispatch(fetchStart())
  try {
    const res = await fetch(`https://cnodejs.org/api/v1/topics?tab=${value}`)
    const { data } = await res.json()
    dispatch({
      type: FETCH_TOPICS_SUCCESS,
      topics: data,
      tab: value,
    })
  } catch (err) {
    dispatch(fetchFail(err))
  }
}
