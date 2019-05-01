import axios from 'axios'
import { baseURL, targetsAPI } from '../utils/config'

const serviceURL = `${baseURL}${targetsAPI}`

const getAll = async () => {
  const response = await axios.get(serviceURL)
  console.log(response.data.length, 'targets')
  return response.data
}

export default { getAll }