const { camelizeKeys } = require('humps')
const { find, get, mapKeys } = require('lodash')
const { handlerError } = require('../../comm')
const config = require('../../config')
const debug = require('debug')('READR:api:project')
const express = require('express')
const router = express.Router()
const superagent = require('superagent')

const jwtExpress = require('express-jwt')
const authVerify = jwtExpress({ secret: config.JWT_SECRET })
const apiHost = config.API_PROTOCOL + '://' + config.API_HOST + ':' + config.API_PORT

router.get('/list', (req, res) => {
  const url = `${apiHost}/report${req.url}`

  debug('Got a /report/list call:')
  debug(req.url)
  debug(req.body)

  superagent
  .get(url)
  .end((error, response) => {
    if (!error && response) {
      debug('Fetch report list from api successfully.')
      // debug(response.body)
      res.send(camelizeKeys(response.body))
    } else {
      const errWrapped = handlerError(error, response)
      res.status(errWrapped.status).send({
        status: errWrapped.status,
        text: errWrapped.text
      })
      console.error(`Error occurred during fetch data from : ${url}`)
      console.error(error) 
    }
  })
})

router.post('/create', (req, res) => {
  debug('Got a report creating call.')
  debug(req.body)
  // res.send('ok')
  const url = `${apiHost}/report`
  superagent
  .post(url)
  .send(req.body)
  .end((error, response) => {
    if (!error && response) {
      res.send({ status: 200, text: 'Create a new report successfully.' })
    } else {
      const errWrapped = handlerError(error, response)
      res.status(errWrapped.status).send({
        status: errWrapped.status,
        text: errWrapped.text
      })
      console.error(`Error occurred during create a new report : ${url}`)
      console.error(error) 
    }
  })
})

router.put('/update', (req, res) => {
  debug('Got a report updating call.')
  debug(req.body)
  const url = `${apiHost}/report`
  superagent
  .put(url)
  .send(req.body)
  .end((error, response) => {
    if (!error && response) {
      res.send({ status: 200, text: 'Updating a new report successfully.' })
    } else {
      const errWrapped = handlerError(error, response)
      res.status(errWrapped.status).send({
        status: errWrapped.status,
        text: errWrapped.text
      })
      console.error(`Error occurred during update report: ${url}`)
      console.error(error) 
    }
  })
})

router.delete('/', (req, res) => {
  debug('Got a proj del call.')
  debug(req.body)
  const id = get(req, 'body.id')
  const url = `${apiHost}/report/${id}`
  debug(url)
  superagent
  .delete(url)
  .end((error, response) => {
    if (!error && response) {
      res.send({ status: 200, text: 'Updating a new report successfully.' })
    } else {
      const errWrapped = handlerError(error, response)
      res.status(errWrapped.status).send({
        status: errWrapped.status,
        text: errWrapped.text
      })
      console.error(`Error occurred during update report: ${url}`)
      console.error(error) 
    }
  })
})

module.exports = router
