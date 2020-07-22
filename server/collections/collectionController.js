const {
  wrapAsync,
  checkUser,
  getMetaData,
  validateMandatoryFields,
  validateUniqueness,
  findObjectById
} = require('../utils/controllerHelpers')
const collectionRouter = require('express').Router()
const PanCollection = require('./panCollection')
const { User, UserRight } = require('../users')

collectionRouter.get('/', wrapAsync(async (req, res, next) => {
  const collections = await PanCollection
    .find({})
    .sort('name')
  res.json(collections)
}))

collectionRouter.post('/', wrapAsync(async (req, res, next) => {
  checkUser(req)
  validateMandatoryFields(req, ['name'], 'collection', 'create')
  await validateUniqueness(PanCollection, 'collection', 'name', req.body.name)

  let collection = new PanCollection({
    name: req.body.name,
    description: req.body.description,
    owner: req.user,
    userRights: [],
    sets: [],
    slots: [],
    customFields: req.body.customFields,
    metaData: getMetaData(req)
  })
  console.log('collection to be saved', collection)
  collection = await collection.save()

  let userRight = new UserRight({
    user: req.user,
    panCollection: collection,
    rightLevel: 'admin'
  })
  userRight = await userRight.save()
  let user = await User.findById(req.user)
  console.log('adding new right to user')
  if (user.userRights) {
    user.userRights.push(userRight)
  } else {
    user.userRights = [userRight]
  }
  console.log('updating user', user)
  await User.findByIdAndUpdate(user._id, user)
  console.log('adding new right to collection')
  collection.userRights.push(userRight)
  collection = await PanCollection.findByIdAndUpdate(collection._id, collection, { new: true })

  res.status(201).json(collection)
}))

collectionRouter.put('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  validateMandatoryFields(req, ['name'], 'collection', 'update')
  let collection = await findObjectById(req.params.id, PanCollection, 'collection')
  await validateUniqueness(PanCollection, 'collection', 'name', req.body.name, collection._id)

  collection.name = req.body.name
  collection.description = req.body.description
  collection.metaData = getMetaData(req, collection.metaData)
  collection = await PanCollection.findByIdAndUpdate(collection._id, collection, { new: true })

  res.status(201).json(collection)
}))

collectionRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  let collection = await findObjectById(req.params.id, PanCollection, 'collection')

  if (collection.slots.length > 0) {
    res.status(403).json({
      error: 'Collection cannot be deleted as it still has slots.'
    })
  } else if (collection.sets.length > 0) {
    res.status(403).json({
      error: 'Collection cannot be deleted as it still has sets.'
    })
  } else {
    await PanCollection.findByIdAndRemove(collection._id)
    res.status(204).end()
  }
}))

module.exports = collectionRouter