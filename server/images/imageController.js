const {
	wrapAsync,
	checkUser,
	getMetaData,
	validateMandatoryFields,
	validateUniqueness,
	findObjectById
} = require('../utils/controllerHelpers')
const imageRouter = require('express').Router()
const Image = require('./image')

imageRouter.get('/', wrapAsync(async (req, res, next) => {
	// get metadata for all images but not the image files themselves
	const images = await Image
		.find({})
		.sort('name')
	res.json(images)
}))

imageRouter.get('/:id', wrapAsync(async (req, res, next) => {
	// get the actual image
}))

imageRouter.post('/', wrapAsync(async (req, res, next) => {
	// upload image metadata and the image itself; attach to appropriate Entities
}))

imageRouter.put('/:id', wrapAsync(async (req, res, next) => {
	// update image metadata only - not the actual image; re-attach to appropriate entities
}))

imageRouter.delete('/:id', wrapAsync(async (req, res, next) => {
	// no conditions for deleting
	// delete image files (both original and thumbnail) from S3, then the metadata
	// remove also refs to this image from other Entities
}))

module.exports = imageRouter