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
    const response = await axios.post(serviceURL, { username: username, password: password, admin: admin }, config)
    //console.log(response.data)
    return response.data
  }
  return null
}

const update = async (bouser) => {
  console.log('bouserService: update', bouser)
  let config = getConfig()
  if (config !== null) {
    console.log('config ok')
    const response = await axios.put(serviceURL, bouser, config)
    console.log('put response status:', response.status, 'data:', response.data)
    return response
  }
  return null
}

const remove = async (bouser) => {
  let config = getConfig()
  if (config !== null) {
    const response = await axios.delete(`${serviceURL}/${bouser._id}`, config)
    return response
  }
  return null
}

export default { getAll, create, update, remove }