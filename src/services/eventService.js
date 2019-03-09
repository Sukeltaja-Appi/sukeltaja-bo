import axios from 'axios'
//const baseURL = '/events'
//const baseURL = 'http://localhost:3001/events'
const baseURL = 'https://sukeltaja.herokuapp.com/api/events/unauth'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}
/*
const create = newObject => {
  const request = axios.post(baseURL, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then(response => response.data)
}
*/
export default { getAll } //, create, update, remove}