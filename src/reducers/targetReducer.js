import targetService from '../services/targetService'

export const initializeTargets = () => {
  return async dispatch => {
    let targets = await targetService.getAll()
    // Sort the targets by 'name:mj_id'
    targets = targets.sort((a, b) =>
      `${a.name}:${a.mj_id}`.toUpperCase().localeCompare(`${b.name}:${b.mj_id}`.toUpperCase()))
    console.log('Initialized targets')
    dispatch({
      type: 'INIT_TARGETS',
      data: targets
    })
  }
}

export const addDivesToTargets = (events, targets) => {
  return async dispatch => {
    // Targets doesn't give us dives. We'll have to scrape them from events.
    if (events !== undefined && events !== null && events.length !== 0) {
      console.log('We see', events.length, 'events')
      let targetDivesMap = new Map()
      // First we combine dives from all events under each target
      await events.forEach((divingEvent) => {
        if (divingEvent.target !== undefined && divingEvent.target !== null &&
          divingEvent.dives !== undefined && divingEvent.dives !== null && divingEvent.dives.length > 0) {
          if (!targetDivesMap.has(`${divingEvent.target.name}:${divingEvent.target.mj_id}`)) {
            let dives = Array.from(divingEvent.dives)
            dives = dives.sort((a, b) => new Date(b.startdate) - new Date(a.startdate))
            targetDivesMap.set(`${divingEvent.target.name}:${divingEvent.target.mj_id}`, dives)
          } else {
            let dives = Array.from(targetDivesMap.get(`${divingEvent.target.name}:${divingEvent.target.mj_id}`))
            dives.concat(divingEvent.dives)
            dives = dives.sort((a, b) => new Date(b.startdate) - new Date(a.startdate))
            targetDivesMap.set(`${divingEvent.target.name}:${divingEvent.target.mj_id}`, dives)
          }
        }
      })
      // Then we need to sort them by target name + mj_id to have them in the same order as
      // as the targets so that associating dives to targets is maybe efficient.
      let sortedTargetDivesMap = await new Map([...targetDivesMap.entries()].sort((a, b) => {
        return `${a.name}:${a.mj_id}`.toUpperCase().localeCompare(`${b.name}:${b.mj_id}`.toUpperCase())
      }))
      console.log('Number of targets with dives', sortedTargetDivesMap.size)
      for (const [key, value] of sortedTargetDivesMap) {
        console.log(key, value)
      }
      // And lastly we add the dives to the appropriate targets
      if (sortedTargetDivesMap !== undefined && sortedTargetDivesMap !== null && sortedTargetDivesMap.size > 0) {
        await targets.forEach((target) => {
          if (sortedTargetDivesMap.has(`${target.name}:${target.mj_id}`)) {
            const dives = Array.from(sortedTargetDivesMap.get(`${target.name}:${target.mj_id}`))
            target.dives = dives
            target.firstDive = dives[dives.length - 1].startdate
            target.lastDive = dives[0].startdate
            sortedTargetDivesMap.delete(`${target.name}:${target.mj_id}`)
          }
        })
      }
    }
    dispatch({
      type: 'ADD_DIVES',
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
    case 'ADD_DIVES':
      return action.data
    case 'CLEAR_TARGETS':
      return null
    default:
      return state
  }
}

export default targetReducer