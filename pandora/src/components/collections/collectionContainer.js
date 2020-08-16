import React from 'react'
import PropTypes from 'prop-types'
import { CategoryListings } from '../categories'
import { CollectionHeader } from './index'

const CollectionContainer = ({ collection }) => {

  return (
    <>
      <CollectionHeader
        collection={collection}
      />
    </>
  )
}

export default CollectionContainer

CollectionContainer.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }))
  })
}