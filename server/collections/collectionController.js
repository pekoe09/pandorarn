const {
	wrapAsync,
	checkUser,
	getMetaData,
	validateMandatoryFields
} = require('../utils/controllerHelpers')
const collectionRouter = require('express').Router()
const Collection = require('./collection')

collectionRouter.get('/', wrapAsync(async (req, res, next) => {
	const collections = await Collection
		.find({})
		.sort('name')
	res.json(collections)
}))

collectionRouter.post('/', wrapAsync(async (req, res, next) => {
	checkUser(req)
	validateMandatoryFields(req, ['name'], 'collection', 'create')

	let nameMatch = await Collection.findOne({ name: req.body.name })
	if (nameMatch) {
		let err = new Error('Another collection has the same name')
		err.isBadRequest = true
		throw err
	}

	let collection = new Collection({
		name: req.body.name,
		description: req.body.description,
		sets: [],
		slots: [],
		metaData: getMetaData(req)
	})
	collection = await collection.save()

	res.status(201).json(collection)
}))

collectionRouter.put('/:id', wrapAsync(async (req, res, next) => {
	checkUser(req)
	validateMandatoryFields(req, ['name'], 'collection', 'update')

	let collection = await Collection.findById(req.params.id)
	if (!collection) {
		let err = new Error('Collection not found')
		err.isBadRequest = true
		throw err
	}

	let nameMatch = await Collection.findOne({ name: req.body.name })
	if (nameMatch && !nameMatch._id.equals(collection._id)) {
		let err = new Error('Another collection has the same name')
		err.isBadRequest = true
		throw err
	}

	collection.name = req.body.name
	collection.description = req.body.description
	collection.metaData = getMetaData(req, collection.metaData)
	collection = await Collection.findByIdAndUpdate(collection._id, collection)

	res.status(201).json(collection)
}))

collectionRouter.delete('/:id', wrapAsync(async (req, res, next) => {
	checkUser(req)

	let collection = await Collection.findById(req.params.id)
	if (!collection) {
		let err = new Error('Collection not found')
		err.isBadRequest = true
		throw err
	}

	if (collection.slots.length > 0) {
		res.status(403).json({
			error: 'Collection cannot be deleted as it still has slots.'
		})
	} else if (collection.sets.length > 0) {
		res.status(403).json({
			error: 'Collection cannot be deleted as it still has sets.'
		})
	} else {
		await Collection.findByIdAndRemove(collection._id)
		res.status(204).end()
	}
}))

module.exports = collectionRouter