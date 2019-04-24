import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import decimalToDMS from '../utils/coordinates'

const DiveDetails = (props) => {

  const noMargins = { "margins": "0px" }

  if (props.dive && props.dive !== null) {
    const dive = props.dive
    return (
      <Container id={dive._id} style={noMargins}>
        <Row>
          <Col id="caption">
            Sijainti:
          </Col>
          <Col lg={6}>
            {`${decimalToDMS(dive.latitude)}`}{dive.latitude > 0 ? ' N ' : ' S '}
            {`${decimalToDMS(dive.longitude)}`}{dive.longitude > 0 ? ' E ' : ' W '}
          </Col>
          <Col lg={4}>
            &nbsp;
          </Col>
        </Row>
      </Container>
    )
  } else {
    return null
  }
}

export default DiveDetails