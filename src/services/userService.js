import axios from 'axios'
import { storageKeyUser, baseURL, usersAPI } from '../utils/config'

const serviceURL = `${baseURL}${usersAPI}`

const getAll = async () => {

  let config = ''
  const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
  if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
    const token = `bearer ${JSON.parse(loggedUserJSON).token}`
    config = {
      headers: { Authorization: token },
    }
  } else {
    console.log('Unauthorized call in userService')
    return null
  }
  const response = await axios.get(serviceURL, config)
  //console.log(response.data.length, 'users')
  //console.log(response.data)
  return response.data
}

export default { getAll }