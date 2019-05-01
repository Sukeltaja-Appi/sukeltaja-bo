import React from 'react'
import { Form, Col } from 'react-bootstrap'

export const StartFilter = (props) => {
  return (
    <>
      <Form.Label>Alkaen</Form.Label>
      <Form.Control type="text" placeholder="pp.kk.vvvv" name="startdateFilter"
        value={props.startFilter} onChange={props.trigger} />
      <Form.Text className="text-muted">
        Rajaa alkamispäivän mukaan
      </Form.Text>
    </>
  )
}

export const EndFilter = (props) => {
  return (
    <>
      <Form.Label>Päättyen</Form.Label>
      <Form.Control type="text" placeholder="pp.kk.vvvv" name="enddateFilter"
        value={props.endFilter} onChange={props.trigger} />
      <Form.Text className="text-muted">
        Rajaa päättymispäivän mukaan
      </Form.Text>
    </>
  )
}

/* Not in use at the moment
export const HasDivesFilter = (props) => {
  return (
    <>
      <Form.Label>Sukelluksia tehty</Form.Label>
      <div key={'inline-checkbox'} className="mb-3">
        <Form.Check inline label="Kyllä" type="checkbox" checked={props.hasDives} onChange={props.hasTrigger} id={'inline-checkbox-yes'} />
        <Form.Check inline label="Ei" type="checkbox" checked={props.noDives} onChange={props.noTrigger} id={'inline-checkbox-no'} />
      </div>
      <Form.Text className="text-muted">
        Rajaa tehtyjen sukellusten mukaan
      </Form.Text>
    </>
  )
}
*/

export const CreatorFilter = (props) => {
  return (
    <>
      <Form.Label>Perustaja</Form.Label>
      <Form.Control type="text" placeholder="Perustajan käyttäjänimi" name="creatorFilter"
        value={props.creatorFilter} onChange={props.trigger} />
      <Form.Text className="text-muted">
        Rajaa tapahtuman perustajan käyttäjänimen osalla
      </Form.Text>
    </>
  )
}

export const TitleFilter = (props) => {
  return (
    <>
      <Form.Label>Nimi</Form.Label>
      <Form.Control type="text" placeholder="Tapahtuman nimi" name="titleFilter"
        value={props.titleFilter} onChange={props.trigger} />
      <Form.Text className="text-muted">
        Rajaa tapahtuman nimen osalla
      </Form.Text>
    </>
  )
}

export const DescriptionFilter = (props) => {
  return (
    <>
      <Form.Label>Kuvaus</Form.Label>
      <Form.Control type="text" placeholder="Tapahtuman kuvaus" name="descriptionFilter"
        value={props.descriptionFilter} onChange={props.trigger} />
      <Form.Text className="text-muted">
        Rajaa tapahtuman kuvauksen osalla
      </Form.Text>
    </>
  )
}

export const LocationFilter = (props) => {
  return (
    <>
      <Form.Group as={Col}>
        <Form.Label>{props.title}</Form.Label>
        <Form.Control type="number" step="0.1" min="-90.0" max="90.0"
        placeholder="Esim 60,0" name="latitudeFilter"
        value={props.latitudeFilter} onChange={props.latitudeTrigger} />
      <Form.Text className="text-muted">
        Rajaa aluetta leveyspiirillä desimaaleina
      </Form.Text>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Control type="number" step="0.1" min="-180.0" max="180.0"
        placeholder="Esim 25,0" name="longitudeFilter"
        value={props.longitudeFilter} onChange={props.longitudeTrigger} />
      <Form.Text className="text-muted">
        Rajaa aluetta pituuspiirillä desimaaleina
      </Form.Text>
      </Form.Group>
    </>
  )
}

export const TargetFilter = (props) => {
  return (
    <>
      <Form.Label>Kohde</Form.Label>
      <Form.Control type="text" placeholder="Kohteen nimi" name="targetFilter"
        value={props.targetFilter} onChange={props.trigger} />
      <Form.Text className="text-muted">
        Rajaa kohteen nimen osalla
      </Form.Text>
    </>
  )
}

export const UsernameFilter = (props) => {
  return (
    <>
      <Form.Label>Käyttäjä</Form.Label>
      <Form.Control type="text" placeholder="Käyttäjänimi" name="usernameFilter"
        value={props.usernameFilter} onChange={props.trigger} />
      <Form.Text className="text-muted">
        Rajaa käyttäjänimen osalla
      </Form.Text>
    </>
  )
}

export const EmailFilter = (props) => {
  return (
    <>
      <Form.Label>Sähköposti</Form.Label>
      <Form.Control type="text" placeholder="joku@jossain.com" name="emailFilter"
        value={props.emailFilter} onChange={props.trigger} />
      <Form.Text className="text-muted">
        Rajaa sähköpostiosoitteen osalla
      </Form.Text>
    </>
  )
}
