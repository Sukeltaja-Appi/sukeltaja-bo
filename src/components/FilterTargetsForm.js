import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { LocationFilter, TargetFilter} from './FilterFields'

const FilterTargetsForm = (props) => {

  return (

    <div>
      <div id="caption">
        Suodata näytettäviä kohteita
      </div>
      <Form>
        <Row>
          <Col>
            <TargetFilter value={props.targetFilter} trigger={props.handleTargetFiltering} />
          </Col>
          <Col>
            <LocationFilter title={'Alueen luoteisnurkka'} 
              latitudeFilter={props.northFilter} latitudeTrigger={props.handleNorthFiltering}
              longitudeFilter={props.westFilter} longitudeTrigger={props.handleWestFiltering} />
          </Col>
          <Col>
            <LocationFilter title={'Alueen kaakkoisnurkka'}
              latitudeFilter={props.southFilter} latitudeTrigger={props.handleSouthFiltering}
              longitudeFilter={props.eastFilter} longitudeTrigger={props.handleEastFiltering} />
          </Col>
        </Row>
      </Form>
    </div>
  )

}

export default FilterTargetsForm
