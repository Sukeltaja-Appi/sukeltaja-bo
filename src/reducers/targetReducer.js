import targetService from '../services/targetService'

export const initializeTargets = () => {
  return async dispatch => {
    const targets = await targetService.getAll()
    console.log('Initialized targets')
    dispatch({
      type: 'INIT_TARGETS',
      data: targets
    })
  }
}

export const clearTargets = () => {
  return {
    type: 'CLEAR_TARGETS'
  }
}

const targetReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_TARGETS':
      return action.data.sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
    case 'CLEAR_TARGETS':
      return null
    default:
      return state
  }
}

export default targetReducer