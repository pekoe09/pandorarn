import React from 'react'
import PropTypes from 'prop-types'
import {
  CategoryListing,
  CategoryContext
} from './index'

const CategoryListings = ({
  categories,
  handleAddCategory,
  handleEditCategory,
  handleDeleteCategory
}) => {

  const getCategoryListings = () => {
    return categories.map(c =>
      <CategoryContext.Consumer>
        {value => (
          <CategoryListing
            category={c}
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={value.handleDeleteCategory}
            key={c._id} />
        )}
      </CategoryContext.Consumer>
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
  handleEditCategory: PropTypes.func.isRequired
}