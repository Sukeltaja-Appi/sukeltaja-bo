import React from 'react'
import { render, cleanup, fireEvent, getByPlaceholderText } from 'react-testing-library'
import Targets from '../components/Targets'
import { Provider } from 'react-redux'
import 'jest-dom/extend-expect'
import { targetsfilename } from '../utils/config'

describe('Testing Targets component', () => {

  const targets = require('./targetDives.json')

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
    targets: targets
  }

  const authentication = {}
  authentication.loggedUser = {}

  const fakeStore = {
    targets: targets,
    authentication: authentication,
    subscribe: function dummy() { return null },
    dispatch: function dummy() { return null },
    getState: function getState() { return { targets: targets, authentication: authentication } }
  }//store

  const Wrapper = (props) => {
    const onChange = (event) => {
      props.state.targetFilter = event.target.targetFilter
    }
    return (
      <Provider store={fakeStore}>
        <Targets
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
      <Targets state={state} />
    </Provider>
  )

  test('Renders Targets component without targets', () => {

    expect(component.container).toHaveTextContent('Kohde')
    expect(component.container).toHaveTextContent('Sijainti')

  })

  test('Renders Targets component with targets', () => {

    component.rerender(
      <Provider store={fakeStore}>
        <Targets state={state} />
      </Provider>,
    )

    targets.map(target => {
      expect(component.container).toHaveTextContent(target.name)
      expect(component.container).toHaveTextContent(target.mj_id)
    })

  })

  test('Makes link for downloading targets', () => {

    component.rerender(
      <Provider store={fakeStore}>
        <Targets state={state} />
      </Provider>,
    )

    const dlLink = component.container.querySelector('a')
    const dlLinkHref = dlLink.getAttribute('download')
    expect(dlLinkHref).toContain(targetsfilename)

  })

  test('Filters targets with target name', async () => {

    state.targets = targets

    let component = render(
      <Wrapper handleTargetFiltering={handleTargetFiltering} state={state} store={fakeStore} />
    )

    // Name of the first target:
    const notToContainInEnd = targets[0].name
    // Name of the last target:
    const toContainInEnd = targets[targets.length - 1].name

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