import eventService from '../services/eventService'

export const initializeEvents = () => {
  return async dispatch => {
    const events = await eventService.getAll()
    console.log("eventService events:", events)
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
      console.log("eventService action data", action.data)
      return action.data.sort((a, b) => b.startdate - a.startdate)
    case 'CLEAR_EVENTS':
      return null
    default:
      return state
  }
}

export default eventReducer