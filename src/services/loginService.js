import axios from 'axios'
const baseURL = 'api/login/BO'
//const baseURL = 'https://sukeltaja.herokuapp.com/api/login/BO'

const login = async credentials => {
  const response = await axios.post(baseURL, credentials)
  return response.data
}

export default { login }