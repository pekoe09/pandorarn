const {
	wrapAsync,
	checkUser,
	addChildToEntity,
	removeChildFromEntity,
	getMetaData,
	validateMandatoryFields,
	validateNonNegativeFields,
	findObjectById
} = require('../utils/controllerHelpers')
const slotRouter = require('express').Router()
const Slot = require('./slot')
const { Collection } = require('../collections')
const { Set } = require('../sets')

slotRouter.get('/', wrapAsync(async (req, res, next) => {
	const slots = await Slot
		.find({})
		.sort('_id')
	res.json(slots)
}))

slotRouter.post('/', wrapAsync(async (req, res, next) => {
	await validate(req)

	let slot = new Slot({
		name: req.body.name,
		description: req.body.description,
		ordinality: req.body.ordinality,
		collection: req.body.collection,
		set: req.body.set,
		images: [],
		items: [],
		sightings: [],
		metaData: getMetaData(req)
	})
	slot = await slot.save()

	// if slot has not set defined, it is a direct child of collection
	// and must be attached to collection directly; otherwise, attach to set
	if (!req.body.set) {
		await addChildToEntity(slot._id, req.body.collection, Collection, 'collection', 'slots')
	} else {
		await addChildToEntity(slot._id, req.body.set, Set, 'set', 'slots')
	}

	res.status(201).json(slot)
}))

slotRouter.put('/:id', wrapAsync(async (req, res, next) => {
	validate(req)
	let slot = await findObjectById(req.params.id, Slot, 'slot')
	const { collection: oldCollection, set: oldSet } = slot

	// NB array field contents are modified separately, by calls to the 
	// controller of the child in question
	slot.name = req.body.name
	slot.description = req.body.description
	slot.ordinality = req.body.ordinality
	slot.collection = req.body.collection
	slot.set = req.body.set
	slot.metaData = getMetaData(req, slot.metaData)
	slot = await Slot.findByIdAndUpdate(slot._id, slot, { new: true })

	// update refs in collection and parentSet if these have been changed
	if (slot.collection !== oldCollection) {
		if (!oldSet) {
			await removeChildFromEntity(slot._id, slot.collection, Collection, 'collection', 'slots')
		}
		if (!slot.set) {
			await addChildToEntity(slot._id, slot.collection, Collection, 'collection', 'slots')
		}
	}
	if (slot.set !== oldSet) {
		if (oldSet) {
			await removeChildFromEntity(slot._id, slot.set, Set, 'set', 'slots')
		}
		if (slot.set) {
			await addChildToEntity(slot._id, slot.set, Set, 'set', 'slots')
		}
	}

	res.status(201).json(slot)
}))

slotRouter.delete('/:id', wrapAsync(async (req, res, next) => {
	checkUser(req)
	let slot = await findObjectById(req.params.id, Slot, 'slot')

	if (slot.items.length > 0) {
		res.status(403).json({
			error: `Slot cannot be deleted as it still has ${slot.items.length} items directly attached.`
		})
	} else if (slot.sightings.length > 0) {
		res.status(403).json({
			error: `Slot cannot be deleted as it still has ${slot.sightings.length} sightings directly attached.`
		})
	} else if (slot.images.length > 0) {
		res.status(403).json({
			error: `Slot cannot be deleted as it still has ${slot.images.length} images directly attached.`
		})
	} else {
		if (slot.set) {
			await removeChildFromEntity(slot._id, slot.set, Set, 'set', 'slots')
		} else {
			await removeChildFromEntity(slot._id, slot.collection, Collection, 'collection', 'slots')
		}
		await Slot.findByIdAndDelete(slot._id)
		res.status(204).end()
	}
}))

const validate = async (req) => {
	checkUser(req)
	validateMandatoryFields(req, ['name'], 'slot', 'create')
	validateNonNegativeFields(req, ['ordinality'], 'slot', 'create')
	await findObjectById(req.body.collection, Collection, 'collection')
	if (req.body.set) {
		await findObjectById(req.body.set, Set, 'set')
	}
}

module.exports = slotRouter