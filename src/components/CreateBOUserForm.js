import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { UsernameField, PasswordField, VerifyField, AdminField } from './InputFields'

const CreateBOUserForm = (props) => {

  return (
    <div>
      <Form>
        <Row>
          <Col>
            <UsernameField usernameField={props.usernameField} trigger={props.handleUsernameField}
             usernamehint={`usernamehint${props.bouserid}`} disabled={false} setusername={`setusername${props.bouserid}`} />
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
              onClick={props.handleBOUserCreate}>Lisää</Button>
            &nbsp;
            <Button variant="primary" type="button" value={props.bouserid}
              onClick={props.handleNewBOUserCancel}>Peru</Button>
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

export default CreateBOUserForm
