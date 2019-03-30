import React from 'react'
import { Form } from 'react-bootstrap'

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
