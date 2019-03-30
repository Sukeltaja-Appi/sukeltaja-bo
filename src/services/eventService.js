import axios from 'axios'
//const baseURL = 'api/events/unauth'
const baseURL = 'http://localhost:3001/api/events/unauth'
//const baseURL = 'https://sukeltaja.herokuapp.com/api/events/unauth'

const getAll = async () => {
  const response = await axios.get(baseURL)
  console.log(response.data.length, 'events')
  return response.data
}

export default { getAll }