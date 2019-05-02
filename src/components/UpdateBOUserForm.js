import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { UsernameField, PasswordField, AdminField } from './InputFields'

const UpdateBOUserForm = (props) => {

  const actionButton = () => {
    if (props.bouserid !== 'newBOUser') {
      return (
        <Button variant="primary" type="button" value={props.bouserid}
          onClick={props.handleBOUserUpdate}>Päivitä</Button>
      )
    } else {
      return (
        <Button variant="primary" type="button" value={props.bouserid}
          onClick={props.handleBOUserAdd}>Lisää</Button>
      )
    }
  }
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
            <PasswordField passwordField={props.passwordField} trigger={props.handlePasswordField} />
          </Col>
          <Col>
            <AdminField adminField={props.adminField} trigger={props.handleAdminField} />
          </Col>
        </Row>
        <Row>
          <Col>
            {actionButton()}
            &nbsp;
            {removeButton()}
          </Col>
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>
      </Form>
    </div>
  )

}

export default UpdateBOUserForm
