const {
	wrapAsync,
	checkUser,
	getMetaData,
	validateMandatoryFields,
	validateUniqueness,
	findObjectById
} = require('../utils/controllerHelpers')
const venueRouter = require('express').Router()
const Venue = require('./venue')
const Sighting = require('../sightings')

venueRouter.get('/', wrapAsync(async (req, res, next) => {
	const venues = await Venue
		.find({})
		.sort('name')
	res.json(venues)
}))

venueRouter.post('/', wrapAsync(async (req, res, next) => {
	checkUser(req)
	validateMandatoryFields(req, ['name'], 'venue', 'create')
	await validateUniqueness(Venue, 'venue', 'name', req.body.name)

	let venue = new Venue({
		name: req.body.name.name,
		description: req.body.description,
		metaData: getMetaData(req)
	})
	venue = await venue.save()

	res.status(201).json(venue)
}))

venueRouter.put('/:id', wrapAsync(async (req, res, next) => {
	checkUser(req)
	validateMandatoryFields(req, ['name'], 'venue', 'update')
	let venue = await findObjectById(req.params.id, Venue, 'venue')
	await validateUniqueness(Venue, 'venue', 'name', req.body.name, venue._id)

	venue.name = req.body.name
	venue.description = req.body.description
	venue.metaData = getMetaData(req, venue.metaData)
	venue = await Venue.findByIdAndUpdate(venue._id, venue, { new: true })

	res.status(201).json(venue)
}))

venueRouter.delete('/:id', wrapAsync(async (req, res, next) => {
	checkUser(req)
	let venue = await findObjectById(req.params.id, Venue, 'venue')

	const sightings = await Sighting.find({ venue: venue._id })
	if (sightings.length > 0) {
		res.status(403).json({
			error: 'Venue cannot be deleted as it still has sightings.'
		})
	} else {
		await Venue.findByIdAndRemove(venue._id)
		res.status(204).end()
	}
}))

module.exports = venueRouter