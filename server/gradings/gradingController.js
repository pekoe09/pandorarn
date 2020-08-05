const {
  wrapAsync,
  checkUser,
  validateMandatoryFields,
  validateUniqueness,
  getMetaData
} = require('../utils/controllerHelpers')
const gradingRouter = require('express').Router()
const Grading = require('./grading')

gradingRouter.get('/', wrapAsync(async (req, res, next) => {
  console.log('received get query', req.body)
  const gradings = await Grading
    .find({})
    .sort('name')
  res.json(gradings)
}))

gradingRouter.post('/', wrapAsync(async (req, res, next) => {
  checkUser(req)
  validateMandatoryFields(req, ['name'], 'grading', 'create')
  await validateUniqueness(Grading, 'grading', 'name', req.body.name)

  let grading = new Grading({
    name: req.body.name,
    description: req.body.description,
    grades: req.body.grades,
    owner: req.user,
    metadata: getMetaData(req)
  })
  console.log('grading to be saved', grading)
  grading = await grading.save()

  res.status(201).json(grading)
}))

module.exports = gradingRouter