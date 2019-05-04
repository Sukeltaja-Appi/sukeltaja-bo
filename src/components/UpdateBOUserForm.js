import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { UsernameField, PasswordField, VerifyField, AdminField } from './InputFields'

const UpdateBOUserForm = (props) => {

  return (
    <div>
      <Form>
        <Row>
          <Col>
            <UsernameField usernameField={props.usernameField} trigger={props.handleUsernameField}
             usernamehint={`usernamehint${props.bouserid}`} disabled={true} />
          </Col>
          <Col>
            <AdminField adminField={props.adminField} trigger={props.handleAdminField}
              adminhint={`adminhint${props.bouserid}`} setadmin={`setadmin${props.bouserid}`} />
          </Col>
        </Row>
        <Row>
        <Col>
            <PasswordField passwordField={props.passwordField} trigger={props.handlePasswordField}
              passwordhint={`passwordhint${props.bouserid}`} setpassword={`setpassword${props.bouserid}`} />
          </Col>
          <Col>
            <VerifyField verifyField={props.verifyField} trigger={props.handleVerifyField}
              verifyhint={`verifyhint${props.bouserid}`} setverify={`setverify${props.bouserid}`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" type="button" value={props.bouserid}
              onClick={props.handleBOUserUpdate}>Päivitä</Button>
            &nbsp;
            <Button variant="primary" type="button" value={props.bouserid}
              onClick={props.handleBOUserCancel}>Peru</Button>
            &nbsp;
            <Button variant="danger" type="button" value={props.bouserid} id={`delete${props.bouserid}`}
              onClick={props.handleBOUserDelete}>Poista</Button>
            &nbsp;
            <Form.Text className="text-muted" id={`delhint${props.bouserid}`}></Form.Text>
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
