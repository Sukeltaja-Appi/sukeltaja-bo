var targetz = require('./targetz.json')

const axios = require('axios')

const config = {
  headers: { Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkthbGxlS2FwdGVlbmkiLCJpZCI6IjVjNTA1NjNmMmRhNzljMzFhMGE0ZTdmZSIsImlhdCI6MTU1MTE1MTU1NX0.g9iJf7D69FPI8Qfsj2xEm_P6-T6-PJMdwkF17reC9j0' },
}

const postAll = async () => {
  try {
    for (i = 3; i < targetz.length; i++) {
      const response = await axios.post('http://sukeltaja.herokuapp.com/api/targets', targetz[i], config)
      console.log(response.data)
    }
  } catch (error) {
    console.log(error)
  }
}

postAll()


/*
axios.get('http://sukeltaja.herokuapp.com/api/users')
.then((res) => {
  console.log(res.data)
})
.catch((error) => {
  console.error(error)
})
*/

