import React from 'react'
import { Form } from 'react-bootstrap'

export const UsernameField = (props) => {
  return (
    <>
      <Form.Label>Käyttäjätunnus</Form.Label>
      <Form.Control type="text" required placeholder="Käyttäjätunnus" name="usernameField" id={props.setusername}
        defaultValue={props.usernameField} onChange={props.trigger} disabled={props.disabled} />
      <Form.Text className="text-muted" id={props.usernamehint}></Form.Text>
    </>
  )
}

export const PasswordField = (props) => {
  return (
    <>
      <Form.Label>Salasana</Form.Label>
      <Form.Control type="password" placeholder="Salasana" name="passwordField" id={props.setpassword}
        defaultValue={props.passwordField} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.passwordhint}></Form.Text>
    </>
  )
}

export const VerifyField = (props) => {
  return (
    <>
      <Form.Label>Varmista salasana</Form.Label>
      <Form.Control type="password" placeholder="Salasana uudestaan" name="verifyField" id={props.setverify}
        defaultValue={props.verifyField} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.verifyhint}></Form.Text>
    </>
  )
}

export const EmailField = (props) => {
  return (
    <>
      <Form.Label>Sähköposti</Form.Label>
      <Form.Control type="email" placeholder="joku@jossain.com" name="emailField"
        defaultValue={props.emailField} onChange={props.trigger} />
      <Form.Text className="text-muted">Syötä sähköpostiosoite</Form.Text>
    </>
  )
}

export const AdminField = (props) => {
  return (
    <>
      <Form.Label>Pääkäyttäjä</Form.Label>
      <Form.Control as="select" name="adminField" defaultValue={props.adminField ? true : false}
        onChange={props.trigger} id={props.setadmin}>
        <option value="false">Ei</option>
        <option value="true">Kyllä</option>
      </Form.Control>
      <Form.Text className="text-muted" id={props.adminhint}></Form.Text>
    </>
  )
}