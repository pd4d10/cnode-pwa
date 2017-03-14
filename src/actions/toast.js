export const SHOW_TOAST = 'toast/SHOW_TOAST'
export const HIDE_TOAST = 'toast/HIDE_TOAST'

export const show = feature => ({
  type: SHOW_TOAST,
  feature,
})

export const hide = () => ({
  type: HIDE_TOAST,
})
