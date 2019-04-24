import diveService from '../services/diveService'

export const initializeDives = () => {
  return async dispatch => {
    let dives = await diveService.getAll()
    console.log('Initialized dives')
    dispatch({
      type: 'INIT_DIVES',
      data: dives
    })
  }
}

export const clearDives = () => {
  return {
    type: 'CLEAR_DIVES'
  }
}

const diveReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_DIVES':
      return action.data.sort((a, b) => new Date(b.startdate) - new Date(a.startdate))
    case 'CLEAR_DIVES':
      return null
    default:
      return state
  }
}

export default diveReducer