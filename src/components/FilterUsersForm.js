import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { UsernameFilter, EmailFilter} from './FilterFields'

const FilterUsersForm = (props) => {

  return (

    <div>
      <div id="caption">
        Suodata näytettäviä käyttäjiä
      </div>
      <Form>
        <Row>
          <Col>
            <UsernameFilter value={props.usernameFilter} trigger={props.handleUsernameFiltering} />
          </Col>
          <Col>
            <EmailFilter value={props.emailFilter} trigger={props.handleEmailFiltering} />
          </Col>
        </Row>
      </Form>
    </div>
  )

}

export default FilterUsersForm
