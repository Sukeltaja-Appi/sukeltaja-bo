import eventService from '../services/eventService'

export const initializeEvents = () => {
  return async dispatch => {
    const events = await eventService.getAll()
    dispatch({
      type: 'INIT_EVENTS',
      data: events
    })
  }
}

export const clearEvents = () => {
  return {
    type: 'CLEAR_EVENTS'
  }
}

const eventReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_EVENTS':
      return action.data.sort((a, b) => new Date(b.startdate) - new Date(a.startdate))
    case 'CLEAR_EVENTS':
      return null
    default:
      return state
  }
}

export default eventReducer