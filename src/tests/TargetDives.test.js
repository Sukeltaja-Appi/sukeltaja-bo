import React from 'react'
import { render, cleanup, fireEvent, getByPlaceholderText } from 'react-testing-library'
import TargetDives from '../components/TargetDives'
import { Provider } from 'react-redux'
import 'jest-dom/extend-expect'
import { formatDate } from '../utils/dates'
import { targetdivesfilename } from '../utils/config'

describe('Testing TargetDives component', () => {

  const targetDives = require('./targetDives.json')
  let diveStats = {}
  diveStats.targetDives = targetDives

  const handleStartFiltering = jest.fn()
  const handleEndFiltering = jest.fn()
  const handleTargetFiltering = jest.fn()
  const handleNorthFiltering = jest.fn()
  const handleWestFiltering = jest.fn()
  const handleSouthFiltering = jest.fn()
  const handleEastFiltering = jest.fn()
  const state = {
    StartFilter: '',
    EndFilter: '',
    targetFilter: '',
    NorthFilter: '',
    WestFilter: '',
    SouthFilter: '',
    EastFilter: '',
    targetDives: targetDives
  }

  const authentication = {}
  authentication.loggedUser = {}

  const fakeStore = {
    diveStats: diveStats,
    authentication: authentication,
    subscribe: function dummy() { return null },
    dispatch: function dummy() { return null },
    getState: function getState() { return { diveStats: diveStats, authentication: authentication } }
  }//store

  const Wrapper = (props) => {
    const onChange = (event) => {
      props.state.targetFilter = event.target.targetFilter
    }
    return (
      <Provider store={fakeStore}>
        <TargetDives
          startFilter={props.state.startFilter}
          handleStartFiltering={handleStartFiltering}
          endFilter={props.state.endFilter}
          handleEndFiltering={handleEndFiltering}
          targetFilter={props.state.targetFilter}
          handleTargetFiltering={handleTargetFiltering}
          northFilter={props.state.northFilter}
          handleNorthFiltering={handleNorthFiltering}
          westFilter={props.state.westFilter}
          handleWestFiltering={handleWestFiltering}
          southFilter={props.state.southFilter}
          handleSouthFiltering={handleSouthFiltering}
          eastFilter={props.state.eastFilter}
          handleEastFiltering={handleEastFiltering}
          handleChange={onChange}
          state={state}
        />
      </Provider>
    )
  }


  afterEach(cleanup)

  const component = render(
    <Provider store={fakeStore}>
      <TargetDives state={state} />
    </Provider>
  )

  test('Renders TargetDives component without dives', () => {

    expect(component.container).toHaveTextContent('Kohde')
    expect(component.container).toHaveTextContent('Sijainti')

  })

  test('Renders TargetDives component with dives', () => {

    component.rerender(
      <Provider store={fakeStore}>
        <TargetDives state={state} />
      </Provider>,
    )

    targetDives.map(target => {
      expect(component.container).toHaveTextContent(target.name)
      expect(component.container).toHaveTextContent(target.mj_id)
      expect(component.container).toHaveTextContent(formatDate(Array.from(target.dives)[0].startdate))
      expect(component.container).toHaveTextContent(formatDate(Array.from(target.dives)[0].enddate))
    })

  })

  test('Makes link for downloading target dives', () => {

    component.rerender(
      <Provider store={fakeStore}>
        <TargetDives state={state} />
      </Provider>,
    )

    const dlLink = component.container.querySelector('a')
    const dlLinkHref = dlLink.getAttribute('download')
    expect(dlLinkHref).toContain(targetdivesfilename)

  })

  test('Filters target dives with target name', async () => {

    state.targetDives = targetDives

    let component = render(
      <Wrapper handleTargetFiltering={handleTargetFiltering} state={state} store={fakeStore} />
    )

    // Name of the first target:
    const notToContainInEnd = targetDives[0].name
    // Name of the last target:
    const toContainInEnd = targetDives[targetDives.length - 1].name

    expect(component.container).toHaveTextContent(notToContainInEnd)
    expect(component.container).toHaveTextContent(toContainInEnd)

    const targetFilter = getByPlaceholderText(component.container, 'Kohteen nimi')
    fireEvent.change(targetFilter, { target: { value: toContainInEnd } })

    component.rerender(
      <Wrapper handleTargetFiltering={handleTargetFiltering} state={state} store={fakeStore} />
    )

    expect(component.container).not.toHaveTextContent(notToContainInEnd)
    expect(component.container).toHaveTextContent(toContainInEnd)

  })

})