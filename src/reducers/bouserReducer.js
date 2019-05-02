import bouserService from '../services/bouserService'

export const initializeBOUsers = () => {
  return async dispatch => {
    let bousers = await bouserService.getAll()
    bousers = bousers.sort((a, b) => a.username.toUpperCase().localeCompare(b.username.toUpperCase()))
    //console.log('Initialized users')
    dispatch({
      type: 'INIT_BOUSERS',
      data: bousers
    })
  }
}

export const createBOUser = (username, password, admin) => {
  console.log('At the reducer trying to add bouser', username)
  return async dispatch => {
    console.log('bouserReducer:create', username)
    const newBOUser = bouserService.create(username, password, admin)
    dispatch({
      type: 'ADD_BOUSER',
      data: newBOUser
    })
  }
}

export const updateBOUser = bouser => {
  console.log('At the reducer trying to update bouser', bouser)
  return async dispatch => {
    console.log('bouserReducer:update', bouser)
    const response = await bouserService.update(bouser)
    dispatch({
      type: 'UPDATE_BOUSER',
      data: bouser
    })
  }
}

export const deleteBOUser = (bouser) => {
  console.log('At the reducer', bouser)
  return async dispatch => {
    console.log('bouserReducer:delete', bouser)
    await bouserService.remove(bouser)
    dispatch({
      type: 'DELETE_BOUSER',
      data: bouser
    })
  }
}

export const clearBOUsers = () => {
  return {
    type: 'CLEAR_BOUSERS'
  }
}

const bouserReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BOUSERS':
      return action.data
    case 'ADD_BOUSER':
      return [...state, action.data]
    case 'UPDATE_BOUSER':
      return action.data
    case 'DELETE_BOUSER':
      return action.data
    case 'CLEAR_BOUSERS':
      return null
    default:
      return state
  }
}

export default bouserReducer