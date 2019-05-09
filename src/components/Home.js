import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'

const Home = (props) => {

  //let popularTargets = props.targetDives

  /*
  if (popularTargets !== undefined && popularTargets !== null && popularTargets.length > 0) {
    popularTargets = props.targetDives.filter((target) => {
      return target.dives !== undefined && target.dives !== null && target.dives.length > 0
    })
    popularTargets = popularTargets.sort((a, b) => b.dives.length - a.dives.length)
  }
  */
  /*
  const initStuff = async () => {
    // Do stuff if needed
    let filt = await props.targetDives.filter((target) => {
      return target.dives !== undefined && target.dives !== null && target.dives.length > 0
    })
    filt = await filt.sort((a, b) => b.dives.length - a.dives.length)
    setPopularTargets(filt)
  }

  useEffect(() => {
    initStuff()
  }, [])
  */

  const displayPopTargs = () => {
    /*
    if (popularTargets !== undefined && popularTargets !== null && popularTargets.length > 0) {
      return (
        popularTargets.map((target) => {
          return (
            <Row key={target._id}>
              <Col>{target.name}</Col><Col>{target.dives}</Col>
            </Row>
          )
        })
      )
    } else {*/
      return ( <div>Tätä toiminnallisuutta ei ole vielä toteutettu</div> )
    //}
  }


  if (props.loggedUser !== undefined || props.loggedUser !== null) {
    return (
      <div>
        <div>
          <h2>Sukeltaja Back Office</h2>
          <div>
          </div>
        </div>
        <div>
          <Container>
            <Row>
              <Col>
                <Row>
                  <Col><h3>Suosituimmat sukelluskohteet</h3></Col>
                </Row>
                <Row>
                  <Col id="caption">Kohde</Col><Col id="caption">Sukelluksia</Col>
                </Row>
                {displayPopTargs()}
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
    targetDives: state.targetDives,
    loggedUser: state.authentication.loggedUser
  }
}

const mapDispatchToProps = {
  //loginUser,
  //reLoginUser,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)