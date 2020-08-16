import React from 'react'
import PropTypes from 'prop-types'
import RouteContext from '../app/RouteContext'
import { CategoryListings } from '../categories'
import {
  CollectionContext,
  CollectionHeader
} from './index'

const CollectionContainer = ({ collection }) => {

  return (
    <>
      <CollectionContext.Consumer>
        {value => (
          <CollectionHeader
            collection={collection}
            handleDeleteCollection={value.handleDeleteCollection}
          />
        )}
      </CollectionContext.Consumer>
      <CategoryListings
        categories={collection.categories}
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