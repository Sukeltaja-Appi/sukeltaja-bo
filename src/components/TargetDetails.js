import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { kyppiUrl } from '../utils/config'

const TargetDetails = (props) => {

  const linkToKyppi = (mj_id) => mj_id ? `${kyppiUrl}${mj_id}` : undefined

  const noKidding = { "margins": "0px" }

  if (props.target && props.target !== null) {
    const target = props.target
    return (
      <Container id={target._id} style={noKidding}>
        <Row>
          <Col id="caption">
            Tyyppi:
          </Col>
          <Col >
            {target.type}
          </Col>
          <Col id="caption">
            Materiaali:
            </Col>
          <Col >
            {target.material}
          </Col>
          <Col id="caption">
            Syvyys:
            </Col>
          <Col >
            {target.depth}
          </Col>
        </Row>
        <Row>
          <Col id="caption">
            Museovirasto:
            </Col>
          <Col lg={6}>
            <a href={linkToKyppi(target.mj_id)}>{linkToKyppi(target.mj_id)}</a>
          </Col>
          <Col lg={4}>
            &nbsp;
            </Col>
        </Row>
        <Row>
          <Col id="caption">
            Hylyt.net:
            </Col>
          <Col lg={6}>
            <a href={target.hylyt_link}>{target.hylyt_link}</a>
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

export default TargetDetails