import React from 'react'
import { render, cleanup, fireEvent, getByPlaceholderText, getByText, waitForElement } from 'react-testing-library'
import App from '../components/App'
import Login from '../components/Login'
import { Provider } from 'react-redux'
import store from '../store'
import 'jest-dom/extend-expect'
jest.mock('../services/loginService')
import { correctUsername, correctPassword } from '../services/__mocks__/loginService'

afterEach(cleanup)

const handleLogin = jest.fn()
const state = {
  username: '',
  password: ''
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const Wrapper = (props) => {
  const onChange = (event) => {
    props.state.username = event.target.username
    props.state.password = event.target.password
    props.store = store
  }
  return (
    <Provider store={store}>
      <App
        username={props.state.username}
        password={props.state.password}
        loggedUser={props.loggedUser}
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

    let component = render(
      <Wrapper handleLogin={handleLogin} state={state} store={store} />
    )

    const username = getByPlaceholderText(component.container, 'Syötä käyttäjätunnus')
    const password = getByPlaceholderText(component.container, 'Syötä salasana')
    const button = getByText(component.container, 'Kirjaudu')

    fireEvent.change(username, { target: { value: 'incorrect' } })
    fireEvent.change(password, { target: { value: 'incorrect' } })
    fireEvent.click(button)

    component.rerender(
      <Wrapper handleLogin={handleLogin} state={state} store={store} />
    )
    await waitForElement(
      () => component.container.querySelector('.alert-danger')
    )

    expect(component.container).toHaveTextContent('virheellinen')
    expect(component.container).toHaveTextContent('Käyttäjätunnus')
    expect(component.container).toHaveTextContent('Salasana')

  })

  test('Login successful with correct credentials', async () => {

    let component = render(
      <Wrapper handleLogin={handleLogin} state={state} store={store} />
    )

    const username = getByPlaceholderText(component.container, 'Syötä käyttäjätunnus')
    const password = getByPlaceholderText(component.container, 'Syötä salasana')
    const button = getByText(component.container, 'Kirjaudu')

    fireEvent.change(username, { target: { value: correctUsername } })
    fireEvent.change(password, { target: { value: correctPassword } })
    fireEvent.click(button)

    component.rerender(
      <Wrapper handleLogin={handleLogin} state={state} store={store} />
    )
    
    jest.setTimeout(6000)
    await delay(5000)
    //await waitForElement(
    //   () => component.container.querySelector('.alert-success')
    //)

    //component.debug('comp store.getState:')
    //component.debug(store.getState())
    expect(store.getState().authentication.loggedUser.username).toBe(correctUsername)  

  })

  
})
