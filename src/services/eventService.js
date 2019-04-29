import axios from 'axios'
import { storageKeyUser } from '../utils/config'

//const baseURL = 'api/events/unauth'
//const baseURL = 'http://localhost:3001/api/events/unauth'
const baseURL = 'https://sukeltaja.herokuapp.com/api/events/bo'

const getAll = async () => {

  let config = ''
  const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
  if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
    const token = `bearer ${JSON.parse(loggedUserJSON).token}`
    config = {
      headers: { Authorization: token },
    }
  } else {
    console.log('Unauthorized call in eventService')
    return null
  }

  const response = await axios.get(baseURL, config)
  console.log(response.data.length, 'events')
  return response.data
}

export default { getAll }