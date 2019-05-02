import React from 'react'
import { Form } from 'react-bootstrap'

export const UsernameField = (props) => {
  return (
    <>
      <Form.Label>Käyttäjätunnus</Form.Label>
      <Form.Control type="text" placeholder="Käyttäjänimi" name="usernameField"
        defaultValue={props.usernameField} onChange={props.trigger} />
      <Form.Text className="text-muted">
        Syötä käyttäjätunnus
      </Form.Text>
    </>
  )
}

export const PasswordField = (props) => {
  return (
    <>
      <Form.Label>Salasana</Form.Label>
      <Form.Control type="password" placeholder="Salasana" name="passwordField"
        defaultValue={props.passwordField} onChange={props.trigger} />
      <Form.Text className="text-muted">
        Syötä salasana
      </Form.Text>
    </>
  )
}

export const EmailField = (props) => {
  return (
    <>
      <Form.Label>Sähköposti</Form.Label>
      <Form.Control type="email" placeholder="joku@jossain.com" name="emailField"
        defaultValue={props.emailField} onChange={props.trigger} />
      <Form.Text className="text-muted">
        Syötä sähköpostiosoite
      </Form.Text>
    </>
  )
}

export const AdminField = (props) => {
  return (
    <>
      <Form.Label>Pääkäyttäjä</Form.Label>
      <Form.Control as="select" name="adminField" defaultValue={props.adminField ? true : false} onChange={props.trigger}>
        <option value="false">Ei</option>
        <option value="true">Kyllä</option>
      </Form.Control>
      <Form.Text className="text-muted">
        Valitse onko pääkäyttäjä
      </Form.Text>
    </>
  )
}