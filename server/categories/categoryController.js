const {
  wrapAsync,
  checkUser,
  getMetaData,
  validateUserRights,
  validateMandatoryFields,
  validateUniqueness,
  findObjectById
} = require('../utils/controllerHelpers')
const categoryRouter = require('express').Router()
const Category = require('././category')
const { PanCollection } = require('../collections')
const { User, UserRight } = require('../users')

categoryRouter.get('/', wrapAsync(async (req, res, next) => {
  const categories = await Category
    .find({})
    .sort('name')
  res.json(categories)
}))

categoryRouter.post('/', wrapAsync(async (req, res, next) => {
  console.log('called category post')
  checkUser(req)
  console.log('user checked')
  validateMandatoryFields(req, ['name'], 'category', 'create')
  console.log('fields validated')
  console.log(req.body)
  let collection = await findObjectById(req.body.collectionId, PanCollection, 'collection')
  console.log('collection found')
  console.log('validating rights')
  await validateUserRights(req, collection._id, 'admin')
  console.log('validated')

  let category = new Category({
    name: req.body.name,
    collections: [req.body.collectionId],
    categories: [],
    sets: [],
    slots: [],
    metaData: getMetaData(req)
  })
  category = await category.save()

  if (collection.categories) {
    collection.categories.push(category._id)
  } else {
    collection.categories = [category._id]
  }
  await PanCollection.findByIdAndUpdate(collection._id, collection)

  res.status(201).json(category)
}))

categoryRouter.put('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  validateMandatoryFields(req, ['name'], 'category', 'create')
  let category = await findObjectById(req.params.id, Category, 'category')
  // TODO: check that the collection given in the request is actually a collection included in the list of collections of this category
  let collection = await findObjectById(req.body.collectionId, PanCollection, 'collection')
  await validateUserRights(req, collection._id, 'admin')

  category.name = req.body.name
  category = await Category.findByIdAndUpdate(category._id, category, { new: true })
  res.status(201).json(category)
}))

categoryRouter.delete('/:id', wrapAsync(async (req, res, next) => {
  checkUser(req)
  validateMandatoryFields(req, ['name'], 'category', 'create')
  let category = await findObjectById(req.params.id, Category, 'category')
  let collection = await findObjectById(req.body.collectionId, PanCollection, 'collection')
  await validateUserRights(req, collection._id, 'admin')

  if (category.categories.length > 0) {
    res.status(403).json({
      error: 'Category cannot be deleted as it still has subcategories.'
    })
  } else if (category.slots.length > 0) {
    res.status(403).json({
      error: 'Category cannot be deleted as it still has slots.'
    })
  } else if (category.sets.length > 0) {
    res.status(403).json({
      error: 'Category cannot be deleted as it still has sets.'
    })
  } else {
    await Category.findByIdAndRemove(category._id)
    res.status(204).end()
  }
}))

module.exports = categoryRouter