import React from 'react'
import { render, cleanup, fireEvent, getByPlaceholderText, getByText } from 'react-testing-library'
import App from '../components/App'
import Login from '../components/Login'
import { Provider } from 'react-redux'
import store from '../store'
import 'jest-dom/extend-expect'
jest.mock('../services/loginService')
import { storageKeyUser } from '../utils/config'

afterEach(cleanup)

const handleLogin = jest.fn()
const state = {
  username: '',
  password: ''
}

const Wrapper = (props) => {
  const onChange = (event) => {
    props.state.username = event.target.username
    props.state.password = event.target.password
  }
  return (
    <Provider store={store}>
      <App
        username={props.state.username}
        password={props.state.password}
        handleLogin={props.handleLogin}
        handleChange={onChange}
        state={state}
      />
    </Provider>
  )
}

describe('Testing Login component', () => {

  test('Renders Login component', () => {

    const component = render(
      <Provider store={store}>
        <Login />
      </Provider>,
    )

    expect(component.container).toHaveTextContent('Käyttäjätunnus')
    expect(component.container).toHaveTextContent('Salasana')
    const loginButton = component.container.querySelector('button')
    expect(loginButton).toHaveTextContent('Kirjaudu')

  })

  test('Login unsuccessful with invalid credentials', async () => {

    await window.localStorage.clear()

    const component = render(
      <Wrapper handleLogin={handleLogin} state={state} />
    )

    const username = getByPlaceholderText(component.container, 'Syötä käyttäjätunnus')
    const password = getByPlaceholderText(component.container, 'Syötä salasana')
    const button = getByText(component.container, 'Kirjaudu')

    fireEvent.change(username, { target: { value: 'incorrect' } })
    fireEvent.change(password, { target: { value: 'incorrect' } })
    fireEvent.click(button)

    expect(window.localStorage.getItem(storageKeyUser)).toBeFalsy()

  })

  test('Login successful with correct credentials', async () => {

    await window.localStorage.clear()

    const component = render(
      <Wrapper handleLogin={handleLogin} state={state} />
    )

    const username = getByPlaceholderText(component.container, 'Syötä käyttäjätunnus')
    const password = getByPlaceholderText(component.container, 'Syötä salasana')
    const button = getByText(component.container, 'Kirjaudu')

    fireEvent.change(username, { target: { value: 'correct' } })
    fireEvent.change(password, { target: { value: 'correct' } })
    fireEvent.click(button)

    expect(window.localStorage.getItem(storageKeyUser)).toBeTruthy()
    
  })

})
