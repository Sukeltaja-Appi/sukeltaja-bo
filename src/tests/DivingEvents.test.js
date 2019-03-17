import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { findRenderedDOMComponentWithTag } from 'react-dom/test-utils'
import DivingEvents from '../components/DivingEvents'
import { Provider } from 'react-redux'
import store from '../store'
import 'jest-dom/extend-expect'
jest.mock('../services/eventService')
import { allEvents } from '../services/__mocks__/eventService'
import { formatDate } from '../utils/dates'

describe('Testing DivingEvents component', () => {

  afterEach(cleanup)

  const component = render(
    <Provider store={store}>
      <DivingEvents />
    </Provider>,
  )

  test('Renders DivingEvents component without events', () => {

    expect(component.container).toHaveTextContent('Alkuaika')
    expect(component.container).toHaveTextContent('Loppuaika')
    expect(component.container).toHaveTextContent('Perustaja')
    expect(component.container).toHaveTextContent('Tapahtuma')

  })

  test('Renders DivingEvents component with events', () => {

    component.rerender(
      <Provider store={store}>
        <DivingEvents />
      </Provider>,
    )

    allEvents.map(event => {
      expect(component.container).toHaveTextContent(formatDate(event.startdate))
      expect(component.container).toHaveTextContent(formatDate(event.enddate))
      expect(component.container).toHaveTextContent(event.title)
    })

  })

  test('Makes link for downloading events', () => {

    component.rerender(
      <Provider store={store}>
        <DivingEvents />
      </Provider>,
    )

    const dlLink = component.container.querySelector('a')
    const dlLinkHref = dlLink.getAttribute('href')

    allEvents.map(event => {
    // We need to have escape characters in the CSV file:
    // eslint-disable-next-line
    const delim = '\";\"', beglim = '\"'
    const content = beglim
        .concat(event.startdate).concat(delim)
        .concat(event.enddate).concat(delim)
        .concat('').concat(delim)
        .concat(event.title).concat(delim)
      expect(dlLinkHref).toContain(content)
    })

  })


})