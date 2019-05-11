import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authenticationReducer from './reducers/authenticationReducer'
import notificationReducer from './reducers/notificationReducer'
import targetReducer from './reducers/targetReducer'
import eventReducer from './reducers/eventReducer'
import divesReducer from './reducers/divesReducer'
import userReducer from './reducers/userReducer'
import bouserReducer from './reducers/bouserReducer'

const reducer = combineReducers({
  authentication: authenticationReducer,
  notification: notificationReducer,
  targets: targetReducer,
  events: eventReducer,
  diveStats: divesReducer,
  users: userReducer,
  bousers: bouserReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store