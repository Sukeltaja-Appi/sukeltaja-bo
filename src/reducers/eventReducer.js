import eventService from '../services/eventService'

export const initializeEvents = () => {
  return async dispatch => {
    let events = await eventService.getAll()
    events = events.sort((a, b) => new Date(b.startdate) - new Date(a.startdate))
    //console.log('Initialized events')
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
      return action.data
    case 'CLEAR_EVENTS':
      return null
    default:
      return state
  }
}

export default eventReducer