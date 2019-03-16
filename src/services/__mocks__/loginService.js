import { storageKeyUser } from '../../utils/config'
import { error } from 'console';

const login = async credentials => {
  if (credentials.username === 'correct' && credentials.password === 'correct') {
    //console.log("Correct username & password")
    const user = { id: 'id', username: 'username', token: 'token' }
    await window.localStorage.setItem(storageKeyUser, JSON.stringify(user))
    return user
  } else {
    //console.log("Invalid username & password")
    throw new error("Invalid username & password")
  }
}

export default { login }