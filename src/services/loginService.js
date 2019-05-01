import axios from 'axios'
import { baseURL, loginAPI } from '../utils/config'

const serviceURL = `${baseURL}${loginAPI}`

const login = async credentials => {
  const response = await axios.post(serviceURL, credentials)
  return response.data
}

export default { login }