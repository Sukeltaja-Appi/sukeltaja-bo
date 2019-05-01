import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { UsernameField, AdminField } from './InputFields'

const UpdateBOUserForm = (props) => {

  const removeButton = () => {
    if (props.bouserid !== 'newBOUser') {
      return (
        <Button variant="danger" type="button" value={props.bouserid}
          onClick={props.handleBOUserDelete}>Poista</Button>
      )
    } else {
      return null
    }
  }

  return (

    <div>
      <Form>
        <Row>
          <Col>
            <UsernameField usernameField={props.usernameField} trigger={props.handleUsernameField} />
          </Col>
          <Col>
            <AdminField adminField={props.adminField} trigger={props.handleAdminField} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" type="button" value={props.bouserid}
              onClick={props.handleBOUserUpdate}>{props.buttonText}</Button>
          </Col>
          <Col>
            {removeButton()}
          </Col>
        </Row>
      </Form>
    </div>
  )

}

export default UpdateBOUserForm
