import React from 'react'
import PropTypes from 'prop-types'
import { 
  CategoryHeader, 
  CategoryListings
} from './index'

const CategoryListing = ({
  category,
  handleAddCategory,
  handleEditCategory,
  handleDeleteCategory
}) => {
  return (
    <>
      <CategoryHeader
        category={category}
        handleAddCategory={handleAddCategory}
        handleAddSlot={handleAddCategory}
        handleEditCategory={handleEditCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
      {category.categories
        && <CategoryListings
          categories={category.categories}
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
  handleAddCategory: PropTypes.func.isRequired,
  handleEditCategory: PropTypes.func.isRequired,
  handleDeleteCategory: PropTypes.func.isRequired
})