import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Row, Col, Table, Alert } from 'react-bootstrap'
import Target from './Target'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import DivingEvent from './DivingEvent';

const Home = (props) => {

  const popularTargetsAllTime = props.diveStats.allTimeTopTargets
  const popularTargetsPastYear = props.diveStats.pastYearTopTargets
  const recentDivingEvents = props.diveStats.recentDivingEvents
  const upcomingDivingEvents = props.diveStats.upcomingDivingEvents

  const displayPopTargsAllTime = () => {
    if (popularTargetsAllTime !== undefined && popularTargetsAllTime !== null && popularTargetsAllTime.length > 0) {
      return (
        popularTargetsAllTime.map((target) => {
          return (
            <Target key={`atpop${target._id}`} target={target} elementID={target._id} noDetails={true} />
          )
        })
      )
    } else
      return (<tr><td colSpan="2"><span>Näyttäisi siltä, että yhtään sukelluksia ei ole tehty</span></td></tr>)
  }

  const displayPopTargsPastYear = () => {
    if (popularTargetsPastYear !== undefined && popularTargetsPastYear !== null && popularTargetsPastYear.length > 0) {
      return (
        popularTargetsPastYear.map((target) => {
          return (
            <Target key={`pypop${target._id}`} target={target} elementID={target._id} noDetails={true} />
          )
        })
      )
    } else
      return (<tr><td colSpan="2"><span>Näyttäisi siltä, että yhtään sukelluksia ei ole tehty</span></td></tr>)
  }

  const displayRecentDivingEvents = () => {
    if (recentDivingEvents !== undefined && recentDivingEvents !== null && recentDivingEvents.length > 0) {
      return (
        recentDivingEvents.map((divingEvent) => {
          return (
            <DivingEvent key={`recent${divingEvent._id}`} divingEvent={divingEvent} noDetails={true} />
          )
        })
      )
    } else
      return (<tr><td colSpan="2"><span>Näyttäisi siltä, että yhtään tapahtumia ei ole järjestetty</span></td></tr>)
  }

  const displayUpcomingDivingEvents = () => {
    if (upcomingDivingEvents !== undefined && upcomingDivingEvents !== null && upcomingDivingEvents.length > 0) {
      return (
        upcomingDivingEvents.map((divingEvent) => {
          return (
            <DivingEvent key={`recent${divingEvent._id}`} divingEvent={divingEvent} noDetails={true} />
          )
        })
      )
    } else
      return (<tr><td colSpan="2"><span>Näyttäisi siltä, että yhtään tapahtumia ei olla järjestämässä</span></td></tr>)
  }

  if (props.loggedUser !== undefined || props.loggedUser !== null) {
    return (
      <div>
        <div>
          <Container>
            <Row>
              <Col>
                <Row>
                  <Col><Alert variant="primary">
                    <span id="caption">Suosituimmat sukelluskohteet</span>
                    </Alert></Col>
                  <Col><Alert variant="primary">
                    <span id="caption">Kuluneen vuoden suosituimmat sukelluskohteet</span>
                    </Alert></Col>
                </Row>
                <Row>
                  <Col>
                    <Table borderless responsive striped size="sm">
                      <thead>
                        <tr>
                          <th>Kohde</th>
                          <th>Sukelluksia</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayPopTargsAllTime()}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Table borderless responsive striped size="sm">
                      <thead>
                        <tr>
                          <th>Kohde</th>
                          <th>Sukelluksia</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayPopTargsPastYear()}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col><Alert variant="primary">
                    <span id="caption">Viimeisimmät tapahtumat</span>
                    </Alert></Col>
                  <Col><Alert variant="primary">
                    <span id="caption">Tulevat tapahtumat</span>
                    </Alert></Col>
                </Row>
                <Row>
                  <Col>
                    <Table borderless responsive striped size="sm">
                      <thead>
                        <tr>
                          <th colSpan="2">Tapahtuma</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayRecentDivingEvents()}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Table borderless responsive striped size="sm">
                      <thead>
                        <tr>
                          <th colSpan="2">Tapahtuma</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayUpcomingDivingEvents()}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  } else {
    if (window.location.pathname !== "/") {
      return (
        <Redirect to="/"></Redirect>
      )
    } else {
      return null
    }
  }

}
Home.propTypes = {
  setNotification: PropTypes.func.isRequired,
  loggedUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    diveStats: state.diveStats,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  //loginUser,
  //reLoginUser,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)