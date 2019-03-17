import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
const FilterForm = (props) => {

  return (

    <div>
      <div id="caption">
        Suodata näytettäviä tapahtumia
      </div>
      <Form>
        <Row>
          <Col>
            <Form.Label>Alkaen</Form.Label>
            <Form.Control type="text" placeholder="pp.kk.vvvv" name="startdateFilter"
              value={props.startFilter} onChange={props.handleStartFiltering} />
            <Form.Text className="text-muted">
              Rajaa tapahtuman alkupäivän mukaan
            </Form.Text>
          </Col>
          <Col>
            <Form.Label>Päättyen</Form.Label>
            <Form.Control type="text" placeholder="pp.kk.vvvv" name="enddateFilter"
              value={props.endFilter} onChange={props.handleEndFiltering} />
            <Form.Text className="text-muted">
              Rajaa tapahtuman loppupäivän mukaan
            </Form.Text>
          </Col>
          <Col>
            <Form.Label>Perustaja</Form.Label>
            <Form.Control type="text" name="creatorFilter"
              value={props.userFilter} onChange={props.handleUserFiltering} />
            <Form.Text className="text-muted">
              Rajaa tapahtuman perustajan käyttäjänimen osalla
            </Form.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Nimi</Form.Label>
            <Form.Control type="text" placeholder="Tapahtuman nimi" name="titleFilter" 
              value={props.titleFilter} onChange={props.handleTitleFiltering} />
            <Form.Text className="text-muted">
              Rajaa tapahtuman nimen osalla
            </Form.Text>
          </Col>
          <Col>
            <Form.Label>Kuvaus</Form.Label>
            <Form.Control type="text" name="descriptionFilter"
              value={props.descriptionFilter} onChange={props.handleDescriptionFiltering} />
            <Form.Text className="text-muted">
              Rajaa tapahtuman kuvauksen osalla
            </Form.Text>
          </Col>
          <Col>
            <Form.Label>Kohde</Form.Label>
            <Form.Control type="text" name="targetFilter"
              value={props.targetFilter} onChange={props.handleTargetFiltering} />
            <Form.Text className="text-muted">
              Rajaa kohteen nimen osalla
            </Form.Text>
          </Col>
        </Row>
      </Form>
    </div>
  )

}

export default FilterForm
