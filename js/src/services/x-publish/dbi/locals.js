import urlParse from 'url-parse'
import {detect} from 'detect-browser'

// export const {origin} = urlParse(location.href)
export const {
  name: event_terminal,
  version: event_terminal_verison,
} = detect()

export function cb (result) {
  if (result && !result.status) {
    console.warn(result);
  }
  // console.log(result);
}

export function getUserId () {
  const userInfo = window.sessionStorage.getItem("userInfo")
  if (userInfo) {
    return userInfo._id || userInfo.id
  }
  return ''
}