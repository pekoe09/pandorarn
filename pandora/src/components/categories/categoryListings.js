import React from 'react'
import PropTypes from 'prop-types'
import { CategoryListing } from './index'

const CategoryListings = ({
  categories,
  handleAddCategory
}) => {

  const getCategoryListings = () => {
    return categories.map(c => <CategoryListing category={c} handleAddCategory={handleAddCategory} key={c.id} />)
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
  handleAddCategory: PropTypes.func.isRequired
}