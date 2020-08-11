import React from 'react'
import PropTypes from 'prop-types'
import { CategoryListings } from '../categories'
import {
  CollectionContext,
  CollectionHeader
} from './index'

const CollectionContainer = ({ collection, toggleEditCollection }) => {

  return (
    <>
      <CollectionContext.Consumer>
        {value => (
          <CollectionHeader
            collection={collection}
            handleEditCollection={toggleEditCollection}
            handleDeleteCollection={value.handleDeleteCollection}
          />
        )}
      </CollectionContext.Consumer>
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
  }),
  toggleEditCollection: PropTypes.func.isRequired
}