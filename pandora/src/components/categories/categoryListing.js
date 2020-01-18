import React from 'react'
import PropTypes from 'prop-types'
import { CategoryHeader, CategoryListings } from './index'

const CategoryListing = ({
  category,
  handleAddCategory
}) => {
  return (
    <>
      <CategoryHeader
        category={category}
        handleAddCategory={handleAddCategory}
      />
      {category.categories
        && <CategoryListings
          categories={category.categories}
          handleAddCategory={handleAddCategory}
        />}
    </>
  )
}

export default CategoryListing

CategoryListing.propTypes = ({
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      categories: PropTypes.array
    }))
  }).isRequired,
  handleAddCategory: PropTypes.func.isRequired
})