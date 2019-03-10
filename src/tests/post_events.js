const axios = require('axios')
const userz = require('./userz.json')
const targetz = require('./targetz.json')

const config = {
  headers: { Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI1YzdlYTA0MzRkNWQyYzM5MDAwZGQxNzUiLCJpYXQiOjE1NTIyMjE2NTF9.qfeo7u0C8OU3mwgjwzk2kz-zC-efSKLtZYileVXBogE' },
}
/*
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
*/
/*
const getTargets = async () => {
  try {
    const response = await axios.get('http://sukeltaja.herokuapp.com/api/targets', config)
    return response.data
    //console.log(targets)
  } catch (error) {
    console.log(error)
  }
}

const getUsers = async () => {
  try {
    const response = await axios.get('http://sukeltaja.herokuapp.com/api/users', config)
    return response.data
    //console.log(users)
  } catch (error) {
    console.log(error)
  }
}
*/
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const title1 = ["Mahtava", "Upea", "Ainutlaatuinen", "Vuoden paras", "Ainutkertainen", "Erinomainen",
"Lyhyt", "Koko vuorokauden kestävä", "Öinen", "Salainen", "Kaikille avoin", "Korkealaatuinen",
"Once-in-lifetime", "Aloittelijoiden", "Kokeneiden", "Lasten", "Senioreiden", "Vapaasukeltajien",
"Meduusanmetsästäjien"]
const title2 = ["keskipäivän", "joulun", "pääsiäisen", "vapun", "juhannuksen", "kesän", "syksyn", "kauden ensimmäinen",
"kauden viimeinen", "kauden tärkein", "maanantainen", "tiistainen", "keskiviikkoinen", "torstainen",
"perjantainen", "lauantainen", "sunnuntainen", "keväinen", "kesäinen", "syksyinen", "talvinen"]
const title3 = ["sukellustapahtuma", "kissanristiäinen", "hylkysukellus", "rantojen siivoustapahtuma",
"snorkkelointi", "pulikointitapahtuma", "aarteenmetsästys", "harppuunakalastus", "hengenpidätyskilpailu",
"hengenpelastusharjoitus", "pönötys", "hyväntekeväisyystapahtuma", "mustekalansyöntikilpailu",
"kalapuikkotapahtuma", "saappaanheittokilpailu", "avantosukellustapahtuma", "käsipohjauintikilpailu"]

// title, description, startdate, enddate, dives, target
const makeUpEvents = async () => {
  //const users = getUsers()
  //const targets = getTargets()
  //console.log("Users", users.length)
  //const uscount = userz.length
  const tgcount = targetz.length
  let i = 0
  for (i = 0; i < 1000; i++) {
    let event = {}
    event.title = title1[getRandomInt(title1.length)].concat(" ")
      .concat(title2[getRandomInt(title2.length)]).concat(" ")
      .concat(title3[getRandomInt(title3.length)])
    event.target = targetz[getRandomInt(tgcount)]._id
    console.log(event)
  }
}

// We'll first get all targets from the database:
//getTargets()
// Then we should get some users
//getUsers()
// Then we should make up some events and choose a target by random from the before fetched targets
makeUpEvents()
// Then we should make up some dives for events that are in the past
// Then we should make up some participants for the event
/*
let p = 0
let participants = []
let pcount = getRandomInt(uscount)
for (p = 0; p < pcount; p++) {
  participants.push(userz[getRandomInt(uscount)]._id)
}
*/
// Then we should post the events to Heroku backend
