import { error } from 'console';

const login = async credentials => {
  if (credentials.username === 'correct' && credentials.password === 'correct') {
    console.log("Correct username & password")
    return { id: 'id', username: 'username', token: 'token' }
  } else {
    console.log("Invalid username & password")
    throw new error("Invalid username & password")
  }
}

export default { login }