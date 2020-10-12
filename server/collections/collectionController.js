const {
  wrapAsync,
  checkUser,
  getMetaData,
  validateUserRights,
  validateMandatoryFields,
  validateUniqueness,
  findObjectById
} = require('../utils/controllerHelpers')
const collectionRouter = require('express').Router()
const PanCollection = require('./panCollection')
const { User, UserRight } = require('../users')

collectionRouter.get('/', wrapAsync(async (req, res, next) => {
  console.log('received get query', req.body)
  const collections = await PanCollection
    .find({})
    .populate('categories')
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
    grading: req.body.grading,
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
  console.log('update call', req.body)
  validateMandatoryFields(req, ['name'], 'collection', 'update')
  let collection = await findObjectById(req.params.id, PanCollection, 'collection')
  console.log('validating user rights')
  await validateUserRights(req, collection._id, 'admin')
  console.log('user rights validated')
  await validateUniqueness(PanCollection, 'collection', 'name', req.body.name, collection._id)

  console.log('received grading', req.body.grading)
  collection.name = req.body.name
  collection.description = req.body.description
  collection.grading = req.body.grading
  collection.customFields = req.body.customFields
  collection.metaData = getMetaData(req, collection.metaData)
  console.log('saving update', collection)
  collection = await PanCollection.findByIdAndUpdate(collection._id, collection, { new: true })

  res.status(201).json(collection)
}))

collectionRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  console.log('deletion request for', req.params.id)
  let collection = await findObjectById(req.params.id, PanCollection, 'collection')
  console.log('validating user rights')
  await validateUserRights(req, collection._id, 'admin')
  console.log('user rights validated')

  if (collection.slots.length > 0) {
    res.status(403).json({
      error: 'Collection cannot be deleted as it still has slots.'
    })
  } else if (collection.sets.length > 0) {
    res.status(403).json({
      error: 'Collection cannot be deleted as it still has sets.'
    })
  } else {
    console.log('removing related user rights')
    let userRightPromises = []
    collection.userRights.forEach(id => { userRightPromises.push(UserRight.findById(id)) })
    const userRights = await Promise.all(userRightPromises)
    let userPromises = []
    userRightPromises = []
    console.log('retrieved userrights', userRights)
    for(let i = 0; i < userRights.length; i++) {
      let userRight = userRights[i]
      console.log('looking at userright', userRight)
      let user = await User.findById(userRight.user)
      console.log('found user', user)
      user.userRights = user.userRights.filter(id => id.toString() !== userRight._id.toString())
      console.log('edited list of userrights', user.userRights)
      userPromises.push(User.findByIdAndUpdate(user._id, user))
      userRightPromises.push(UserRight.findByIdAndRemove(userRight._id))
    }
    await Promise.all(userPromises)
    await Promise.all(userRightPromises)
    await PanCollection.findByIdAndRemove(collection._id)
    res.status(204).end()
  }
}))

module.exports = collectionRouter