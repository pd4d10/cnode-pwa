export const FETCH_TOPICS_START = 'FETCH_TOPICS_START'
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS'
export const FETCH_TOPICS_FAIL = 'FETCH_TOPICS_FAIL'
export const CHANGE_TAB = 'CHANGE_TAB'
export const CHANGE_TAB_FETCH_SUCCESS = 'CHANGE_TAB_FETCH_SUCCESS'

const fetchStart = () => ({
  type: FETCH_TOPICS_START,
})

const fetchSuccess = topics => ({
  type: FETCH_TOPICS_SUCCESS,
  topics,
})

const fetchFail = err => ({
  type: FETCH_TOPICS_FAIL,
  err,
})

export const fetchTopics = () => async (dispatch) => {
  dispatch(fetchStart())
  try {
    const res = await fetch('https://cnodejs.org/api/v1/topics')
    const { data } = await res.json()
    dispatch(fetchSuccess(data))
  } catch (err) {
    dispatch(fetchFail(err))
  }
}

// export const changeTab = value => ({
//   type: CHANGE_TAB,
//   value,
// })

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
      type: CHANGE_TAB_FETCH_SUCCESS,
      topics: data,
      tab: value,
    })
  } catch (err) {
    dispatch(fetchFail(err))
  }
}
