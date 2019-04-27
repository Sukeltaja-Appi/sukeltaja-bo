import eventService from '../services/eventService'

export const mapDivesToTargets = () => {
  return async dispatch => {
    let targetDives = {}
    let events2 = await eventService.getAll()
    // Targets doesn't give us dives. We'll have to scrape them from events.
    if (events2 !== undefined && events2 !== null && events2.length !== 0) {
      //console.log('We see', events2.length, 'events')
      let targetDivesMap = new Map()
      // First we combine dives from all events under targets
      await events2.forEach((divingEvent) => {
        if (divingEvent.target !== undefined && divingEvent.target !== null &&
          divingEvent.dives !== undefined && divingEvent.dives !== null && divingEvent.dives.length > 0) {
          let dives = {}
          let target = {}
          if (!targetDivesMap.has(`${divingEvent.target.name}${divingEvent.target.mj_id}`)) {
            target = divingEvent.target
            dives = Array.from(divingEvent.dives)
          } else {
            target = targetDivesMap.get(`${divingEvent.target.name}${divingEvent.target.mj_id}`)
            dives = target.dives
            dives.concat(divingEvent.dives)
          }
          dives = dives.sort((a, b) => new Date(b.startdate) - new Date(a.startdate))
          dives.forEach((dive) => {
            dive.username = dive.user.username
          })
          target.dives = dives
          targetDivesMap.set(`${divingEvent.target.name}${divingEvent.target.mj_id}`, target)
        }
      })
      // Then we need to sort them by target name + mj_id
      targetDives = Array.from(targetDivesMap.values()).sort((a, b) => {
        return `${a.name}:${a.mj_id}`.toUpperCase().localeCompare(`${b.name}:${b.mj_id}`.toUpperCase())
      })
      //console.log('targetDives', targetDives)
    }
    dispatch({
      type: 'MAP_DIVES_TO_TARGETS',
      data: targetDives
    })
  }

}

const divesReducer = (state = [], action) => {
  switch (action.type) {
    case 'MAP_DIVES_TO_TARGETS':
      return action.data
    default:
      return state
  }
}

export default divesReducer