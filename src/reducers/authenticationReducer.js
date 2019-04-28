import { storageKeyUser } from '../utils/config'
import loginService from '../services/loginService'

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username: username,
      password: password
    })
    await window.localStorage.setItem(storageKeyUser, JSON.stringify(user))
    //console.log("Reducer:", user)
    await dispatch({
      type: 'LOGIN_USER',
      data: {
        loggedUser: user
      }
    })
  }
}

export const reLoginUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'RELOGIN_USER',
      data: {
        loggedUser: user
      }
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    // Clear possible other states
    dispatch({
      type: 'LOGOUT_USER',
      data: {
        loggedUser: null
      }
    })
  }
}

const authenticationReducer = (state = { loggedUser: null }, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
    return action.data
    case 'RELOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return action.data
    default:
      return state
  }
}

export default authenticationReducer