const axios = require('axios')

let targets = {}

const config = {
  headers: { Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkthbGxlS2FwdGVlbmkiLCJpZCI6IjVjNTA1NjNmMmRhNzljMzFhMGE0ZTdmZSIsImlhdCI6MTU1MTE1MTU1NX0.g9iJf7D69FPI8Qfsj2xEm_P6-T6-PJMdwkF17reC9j0' },
}


const getTargets = async () => {
  try {
      const response = await axios.get('http://sukeltaja.herokuapp.com/api/targets', config)
      targets = response.data
      console.log(targets)
  } catch (error) {
    console.log(error)
  }
}

// We'll first get all targets from the database:
getTargets()
// Then we should get some users
// Then we should make up some events and choose a target by random from the before fetched targets
// Then we should make up some dives for events that are in the past
// Then we should post the events to Heroku backend
