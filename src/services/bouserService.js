import axios from 'axios'
import { storageKeyUser, baseURL, bousersAPI } from '../utils/config'

const serviceURL = `${baseURL}${bousersAPI}`

const getConfig = () => {
  const loggedUserJSON = window.localStorage.getItem(storageKeyUser)
  if (loggedUserJSON && loggedUserJSON.length > 0 && loggedUserJSON !== 'null') {
    const token = `bearer ${JSON.parse(loggedUserJSON).token}`
    const config = {
      headers: { Authorization: token },
    }
    return config
  } else {
    console.log('Unauthorized call in bouserService')
    return null
  }

}

const getAll = async () => {
  const config = getConfig()
  if (config !== null) {
    const response = await axios.get(serviceURL, config)
    //console.log(response.data.length, 'bousers')
    //console.log(response.data)
    return response.data
  }
  return null
}

const create = async (username, password, admin) => {
  //console.log('bouserService: add', username)
  const config = getConfig()
  if (config !== null) {
    try {
      const response = await axios.post(serviceURL, { username: username, password: password, admin: admin }, config)
      return response
    } catch (error) {
      console.log('Error creating new bo user', error)
      return error
    }
  }
  return null
}

const update = async (bouser) => {
  //console.log('bouserService: update', bouser)
  let config = getConfig()
  if (config !== null) {
    const response = await axios.put(serviceURL, bouser, config)
    return response
  }
  return null
}

const remove = async (bouser) => {
  //console.log('delete bouser:', bouser)
  let config = getConfig()
  if (config !== null) {
    try {
      const response = await axios.delete(`${serviceURL}/${bouser._id}`, config)
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }
  return null
}

export default { getAll, create, update, remove }