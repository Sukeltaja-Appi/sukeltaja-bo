import React from 'react'
import { render, cleanup, fireEvent, getByPlaceholderText, getByText } from 'react-testing-library'
import Login from '../components/Login'
import { Provider } from 'react-redux'
import store from '../store'
import 'jest-dom/extend-expect'
jest.mock('../services/loginService')

afterEach(cleanup)

const Wrapper = (props) => {
  const onChange = (event) => {
    props.state.username = event.target.username
    props.state.password = event.target.password
  }
  return (
    <Provider store={store}>
      <Login
        username={props.state.username}
        password={props.state.password}
        onSubmit={props.onSubmit}
        handleChange={onChange}
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

  test('Login unsuccessful with invalid credentials', () => {

    const onSubmit = jest.fn()
    const state = {
      username: '',
      password: ''
    }

    const component = render(
      <Wrapper onSubmit={onSubmit} state={state} />
    )

    const username = getByPlaceholderText(component.container, 'Syötä käyttäjätunnus')
    const password = getByPlaceholderText(component.container, 'Syötä salasana')
    const button = getByText(component.container, 'Kirjaudu')

    fireEvent.change(username, { target: { value: 'incorrect' } })
    fireEvent.change(password, { target: { value: 'incorrect' } })
    fireEvent.click(button)

  })

  test('Login successful with correct credentials', () => {

    const onSubmit = jest.fn()
    const state = {
      username: '',
      password: ''
    }

    const component = render(
      <Wrapper onSubmit={onSubmit} state={state} />
    )

    const username = getByPlaceholderText(component.container, 'Syötä käyttäjätunnus')
    const password = getByPlaceholderText(component.container, 'Syötä salasana')
    const button = getByText(component.container, 'Kirjaudu')

    fireEvent.change(username, { target: { value: 'correct' } })
    fireEvent.change(password, { target: { value: 'correct' } })
    fireEvent.click(button)

  })

})
