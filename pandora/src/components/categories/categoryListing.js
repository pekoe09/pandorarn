import React from 'react'
import PropTypes from 'prop-types'
import { CategoryHeader, CategoryListings } from './index'

const CategoryListing = ({
  category,
  handleAddCategory,
  handleEditCategory,
  handleDeleteCategory,
  handleAddSlot,
  handleEditSlot,
  handleDeleteSlot,
  handleAddItem,
  handleEditItem,
  handleDeleteItem,
  handleAddSighting,
  handleEditSighting,
  handleDeleteSighting
}) => {
  return (
    <>
      <CategoryHeader
        category={category}
        handleAddCategory={handleAddCategory}
        handleAddSlot={handleAddSlot}
        handleEditCategory={handleEditCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
      {category.categories
        && <CategoryListings
          categories={category.categories}
          handleAddCategory={handleAddCategory}
          handleEditCategory={handleEditCategory}
          handleDeleteCategory={handleDeleteCategory}
          handleAddSlot={handleAddSlot}
          handleEditSlot={handleEditSlot}
          handleDeleteSlot={handleDeleteSlot}
          handleAddItem={handleAddItem}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
          handleAddSighting={handleAddSighting}
          handleEditSighting={handleEditSighting}
          handleDeleteSighting={handleDeleteSighting}
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
  handleDeleteCategory: PropTypes.func.isRequired,
  handleAddSlot: PropTypes.func.isRequired,
  handleEditSlot: PropTypes.func.isRequired,
  handleDeleteSlot: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
  handleEditItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleAddSighting: PropTypes.func.isRequired,
  handleEditSighting: PropTypes.func.isRequired,
  handleDeleteSighting: PropTypes.func.isRequired
})