import axios from 'axios'
//const baseURL = 'api/targets'
//const baseURL = 'http://localhost:3001/api/targets'
const baseURL = 'https://sukeltaja.herokuapp.com/api/targets'

const getAll = async () => {
  const response = await axios.get(baseURL)
  console.log(response.data.length, 'targets')
  return response.data
}

export default { getAll }