// import * as authActions from './auth'

export const SHOW = 'DRAWER/SHOW'
export const HIDE = 'DRAWER/HIDE'

export const show = () => ({
  type: SHOW,
})

export const hide = () => ({
  type: HIDE,
})

// export const showMessage = () => async (dispatch, getState) => {
//   const { token } = getState().auth

//   // If there is no token, show login popup
//   if (!token) {
//     dispatch(authActions.showLogin())
//     return
//   }

//   try {
//     const json = await fetchAuth(token)
//     dispatch(loginSuccess(token, json))
//   } catch (err) {
//     dispatch(showLogin())
//   }
// }
