// Carries the scroll position across a language change made in the
// switcher. The page re-mounts in the new language; the Preloader reads this
// to skip its intro and put the visitor back where they were.
let pendingScrollY = null

export const rememberScrollForSwitch = (y) => {
  pendingScrollY = y
}

export const takeScrollForSwitch = () => {
  const y = pendingScrollY
  pendingScrollY = null
  return y
}
