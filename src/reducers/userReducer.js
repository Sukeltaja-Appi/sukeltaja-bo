import userService from '../services/userService'

export const initializeUsers = () => {
  return async dispatch => {
    let users = await userService.getAll()
    users = users.sort((a, b) => a.username.toUpperCase().localeCompare(b.username.toUpperCase()))
    //console.log('Initialized users')
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const clearUsers = () => {
  return {
    type: 'CLEAR_USERS'
  }
}

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'CLEAR_USERS':
      return null
    default:
      return state
  }
}

export default userReducer