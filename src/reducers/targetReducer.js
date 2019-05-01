import targetService from '../services/targetService'

export const initializeTargets = () => {
  return async dispatch => {
    let targets = await targetService.getAll()
    // Sort the targets by 'name:mj_id'
    targets = targets.sort((a, b) =>
      `${a.name}:${a.mj_id}`.toUpperCase().localeCompare(`${b.name}:${b.mj_id}`.toUpperCase()))
    //console.log('Initialized targets')
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
      return action.data
    case 'CLEAR_TARGETS':
      return null
    default:
      return state
  }
}

export default targetReducer