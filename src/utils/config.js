export const storageKeyUser = 'sukeltajaBOUser'
export const kyppiUrl = 'https://www.kyppi.fi/to.aspx?id=112.'

// Filenames for JsonTOCSV:
export const eventsfilename = 'sukellustapahtumat.csv'
export const targetdivesfilename = 'kohteidensukellukset.csv'
export const targetsfilename = 'kohteet.csv'
export const usersfilename = 'kayttajat.csv'

// URL and APIs
export const baseURL = 'https://sukeltaja.herokuapp.com/'
export const eventsAPI = 'api/events/bo'
export const targetsAPI = 'api/targets'
export const loginAPI = 'api/login/BO'
export const usersAPI = 'api/users'

export default {
  storageKeyUser,
  kyppiUrl,
  eventsfilename, targetdivesfilename, targetsfilename, usersfilename,
  baseURL, eventsAPI, targetsAPI, loginAPI, usersAPI
}