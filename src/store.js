import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authenticationReducer from './reducers/authenticationReducer'
import notificationReducer from './reducers/notificationReducer'
import targetReducer from './reducers/targetReducer'
import eventReducer from './reducers/eventReducer'
import diveReducer from './reducers/diveReducer'
//import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  authentication: authenticationReducer,
  notification: notificationReducer,
  targets: targetReducer,
  events: eventReducer,
  dives: diveReducer
  //users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store