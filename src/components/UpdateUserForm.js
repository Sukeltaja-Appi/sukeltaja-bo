import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { UsernameField, EmailField} from './InputFields'

const UpdateUserForm = (props) => {

  return (

    <div>
      <Form>
        <Row>
          <Col>
            <UsernameField usernameField={props.usernameField} trigger={props.handleUsernameField} />
          </Col>
          <Col>
            <EmailField emailField={props.emailField} trigger={props.handleEmailField} />
          </Col>
          <Col>
            <Button variant="primary" type="button" value={props.userid} onClick={props.handleUserUpdate}>Päivitä</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )

}

export default UpdateUserForm
