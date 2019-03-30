import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { StartFilter, EndFilter, CreatorFilter, TitleFilter, DescriptionFilter, TargetFilter} from './FilterFields'

const FilterEventsForm = (props) => {

  return (

    <div>
      <div id="caption">
        Suodata näytettäviä tapahtumia
      </div>
      <Form>
        <Row>
          <Col>
            <StartFilter value={props.startFilter} trigger={props.handleStartFiltering} />
          </Col>
          <Col>
            <EndFilter value={props.endFilter} trigger={props.handleEndFiltering} />
          </Col>
          <Col>
            <CreatorFilter value={props.creatorFilter} trigger={props.handleCreatorFiltering} />
          </Col>
        </Row>
        <Row>
          <Col>
            <TitleFilter value={props.titleFilter} trigger={props.handleTitleFiltering} />
          </Col>
          <Col>
            <DescriptionFilter value={props.descriptionFilter} trigger={props.handleDescriptionFiltering} />
          </Col>
          <Col>
            <TargetFilter value={props.targetFilter} trigger={props.handleTargetFiltering} />
          </Col>
        </Row>
      </Form>
    </div>
  )

}

export default FilterEventsForm
