import React from 'react'
import PropTypes from 'prop-types'
import { CategoryListing } from './index'

const CategoryListings = ({
  categories,
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

  const getCategoryListings = () => {
    return categories.map(c =>
      <CategoryListing
        category={c}
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
        key={c.id} />
    )
  }

  return (
    <>
      {categories && getCategoryListings()}
    </>
  )
}

export default CategoryListings

CategoryListings.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
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
}