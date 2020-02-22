const {
	wrapAsync,
	checkUser,
	getMetaData,
	validateMandatoryFields,
	validateNonNegativeFields,
	findObjectById,
	addChildToEntity,
	removeChildFromEntity
} = require('../utils/controllerHelpers')
const setRouter = require('express').Router()
const Set = require('./set')
const { Slot } = require('../slots')
const { Collection } = require('../collections')

setRouter.get('/', wrapAsync(async (req, res, next) => {
	const sets = await Set
		.find({})
		.sort('name')
	res.json(sets)
}))

setRouter.post('/', wrapAsync(async (req, res, next) => {
	validate(req)

	let set = new Set({
		name: req.body.name,
		description: req.body.description,
		ordinality: req.body.ordinality,
		collection: req.body.collection,
		parentSet: req.body.parentSet,
		sets: [],
		slots: [],
		images: [],
		metaData: getMetaData(req)
	})
	set = await set.save()

	// attach set to collection only if no parentSet is defined (i.e. only a direct child of collection)
	if (!req.body.parentSet) {
		await addChildToEntity(set._id, req.body.collection, Collection, 'collection', 'sets')
	} else {
		await addChildToEntity(set._id, req.body.parentSet, Set, 'set', 'sets')
	}

	res.status(201).json(set)
}))

setRouter.put('/:id', wrapAsync(async (req, res, next) => {
	validate(req)
	let set = await findObjectById(req.params.id, Set, 'set')
	const { collection: oldCollection, parentSet: oldParentSet } = set

	// NB array field contents are modified separately, by calls to the 
	// controller of the child in question
	set.name = req.body.name
	set.description = req.body.description
	set.ordinality = req.body.ordinality
	set.collection = req.body.collection
	set.parentSet = req.body.parentSet
	set.metaData = getMetaData(req, set.metaData)
	set = await Set.findByIdAndUpdate(set._id, set, { new: true })

	// update refs in collection and parentSet if these have been changed
	if (set.collection !== oldCollection) {
		if (!oldParentSet) {
			await removeChildFromEntity(set._id, set.collection, Collection, 'collection', 'sets')
		}
		if (!set.parentSet) {
			await addChildToEntity(set._id, set.collection, Collection, 'collection', 'sets')
		}
	}
	if (set.parentSet !== oldParentSet) {
		if (oldParentSet) {
			await removeChildFromEntity(set._id, set.parentSet, Set, 'set', 'sets')
		}
		if (set.parentSet) {
			await addChildToEntity(set._id, set.parentSet, Set, 'set', 'sets')
		}
	}

	res.status(201).json(set)
}))

setRouter.delete('/:id', wrapAsync(async (req, res, next) => {
	checkUser(req)
	let set = await findObjectById(req.params.id, Set, 'set')

	if (set.sets.length > 0) {
		// connect the subsets directly with the parentSet of this Set or,
		// if it has no parentSet, then with the Collection (i.e. erase parentSet
		// field for all direct subSets)
		const promises = set.sets.map(async s => {
			let child = await Set.findById(s)
			child.parentSet = set.parentSet ? set.parentSet : null
			await Set.findByIdAndUpdate(s, child)
		})
		await Promise.all(promises)
	}

	if (set.slots.length > 0) {
		// same as with subsets
		const promises = set.slots.map(async s => {
			let child = await Slot.findById(s)
			child.set = set.parentSet ? set.parentSet : null
			await Slot.findByIdAndUpdate(s, child)
		})
		await Promise.all(promises)
	}

	if (set.images.length > 0) {
		res.status(403).json({
			error: 'Set cannot be deleted as it still has images directly attached.'
		})
	} else {
		if (set.parentSet) {
			await removeChildFromEntity(set._id, set.parentSet, Set, 'set', 'sets')
		} else {
			await removeChildFromEntity(set._id, set.collection, Collection, 'collection', 'sets')
		}
		await Set.findByIdAndRemove(set._id)
		res.status(204).end()
	}
}))

const validate = async (req) => {
	checkUser(req)
	validateMandatoryFields(req, ['name'], 'set', 'create')
	validateNonNegativeFields(req, ['ordinality'], 'set', 'create')
	await findObjectById(req.body.collection, Collection, 'collection')
	if (req.body.parentSet) {
		await findObjectById(req.body.parentSet, Set, 'set')
	}
}

module.exports = setRouter