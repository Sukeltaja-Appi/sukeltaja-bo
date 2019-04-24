import axios from 'axios'
//const baseURL = 'api/dives/unauth'
//const baseURL = 'http://localhost:3001/api/dives/unauth'
const baseURL = 'https://sukeltaja.herokuapp.com/api/dives/unauth'

const getAll = async () => {
  const response = await axios.get(baseURL)
  console.log(response.data.length, 'dives')
  return response.data
}

export default { getAll }