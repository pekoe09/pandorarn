import React from 'react'
import PropTypes from 'prop-types'
import { CollectionHeader } from '../../collections'
import { CategoryListings } from '../../categories'

const MainContainer = ({ collection }) => {

  const handleAddCategory = () => {
    console.log('adding category')
  }

  return (
    <div
      className='main-container'
      style={{ padding: '10px' }}
    >
      <CollectionHeader collection={collection} />
      {collection
        && collection.categories
        && <CategoryListings
          categories={collection.categories}
          handleAddCategory={handleAddCategory}
        />}
    </div>
  )
}

export default MainContainer

MainContainer.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }))
  })
}