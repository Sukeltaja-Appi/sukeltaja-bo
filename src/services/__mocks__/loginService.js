import { error } from 'console';

export const correctUsername = 'holydiver'
export const correctPassword = 'holydiver'

const login = async credentials => {
  if (credentials.username === correctUsername && credentials.password === correctPassword) {
    //console.log("Correct username & password")
    const user = { id: 'id', username: credentials.username, token: 'token' }
    return user
  } else {
    //console.log("Invalid username & password")
    throw new error("Invalid username & password")
  }
}

export default { login }