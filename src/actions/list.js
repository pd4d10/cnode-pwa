export const FETCH_TOPICS_START = 'FETCH_TOPICS_START'
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS'
export const FETCH_TOPICS_FAIL = 'FETCH_TOPICS_FAIL'

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
