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
  //console.log('At the reducer trying to add bouser', username)
  return async dispatch => {
    //console.log('bouserReducer:create:', username)
    const newBOUser = await bouserService.create(username, password, admin)
    //console.log('bouserReducer:new bouser:', newBOUser)
    dispatch({
      type: 'ADD_BOUSER',
      data: newBOUser
    })
  }
}

export const updateBOUser = bouser => {
  //console.log('At the reducer trying to update bouser', bouser)
  return async dispatch => {
    console.log('bouserReducer:update', bouser)
    const response = await bouserService.update(bouser)
    console.log('bouserReducer:response', response)
    if (response.status === 204) {
      dispatch({
        type: 'UPDATE_BOUSER',
        data: bouser
      })
    } else {
      console.log('Something went wrong when updating a bo user')
      dispatch({
        type: 'UPDATE_FAILED'
      })
    }
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
      state = [...state, action.data]
      state.sort((a, b) => a.username.toUpperCase().localeCompare(b.username.toUpperCase()))
      return state
    case 'UPDATE_BOUSER':
      state = state.map((bouser) => {
        return (bouser._id === action.data._id ? action.data : bouser)
      })
      state.sort((a, b) => a.username.toUpperCase().localeCompare(b.username.toUpperCase()))
      return state
    case 'DELETE_BOUSER':
      return state.filter(bouser => bouser._id !== action.data._id)
    case 'CLEAR_BOUSERS':
      return null
    default:
      return state
  }
}

export default bouserReducer