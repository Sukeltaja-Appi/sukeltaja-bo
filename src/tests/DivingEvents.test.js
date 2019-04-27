import React from 'react'
import { render, cleanup, fireEvent, getByPlaceholderText } from 'react-testing-library'
import App from '../components/App'
import DivingEvents from '../components/DivingEvents'
import { Provider } from 'react-redux'
import store from '../store'
import 'jest-dom/extend-expect'
jest.mock('../services/eventService')
import { allEvents } from '../services/__mocks__/eventService'
import { formatDate } from '../utils/dates'

describe('Testing DivingEvents component', () => {

  const handleTitleFiltering = jest.fn()
  const state = {
    titleFilter: ''
  }

  const Wrapper = (props) => {
    const onChange = (event) => {
      props.state.titleFilter = event.target.titleFilter
      props.store = store
    }
    return (
      <Provider store={store}>
        <DivingEvents
          titleFilter={props.state.titleFilter}
          handleTitleFiltering={props.handleTitleFiltering}
          handleChange={onChange}
          state={state}
        />
      </Provider>
    )
  }

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
    const dlLinkHref = dlLink.getAttribute('download')
    expect(dlLinkHref).toContain('sukellustapahtumat.csv')

  })

  test('Filters events with event title', async () => {

    let component = render(
      <Wrapper handleTitleFiltering={handleTitleFiltering} state={state} store={store} />
    )

    // Last word from the first event's title:
    const notToContainInEnd = allEvents[0].title.split(" ").splice(-1)[0]
    // Last word from the first event title that doesn't include value of notToContainInEnd
    const toContainInEnd = (allEvents.filter(event =>
      !event.title.toUpperCase().includes(notToContainInEnd.toUpperCase())))[0]
      .title.split(" ").splice(-1)[0]

    expect(component.container).toHaveTextContent(notToContainInEnd)
    expect(component.container).toHaveTextContent(toContainInEnd)

    const titleFilter = getByPlaceholderText(component.container, 'Tapahtuman nimi')
    fireEvent.change(titleFilter, { target: { value: toContainInEnd } })

    component.rerender(
      <Wrapper handleTitleFiltering={handleTitleFiltering} state={state} store={store} />
    )

    expect(component.container).not.toHaveTextContent(notToContainInEnd)
    expect(component.container).toHaveTextContent(toContainInEnd)

  })

})