import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButtons } from '../common'
import './categoryHeader.scss'

const CategoryHeader = ({
  category,
  handleAddCategory,
  handleAddSlot,
  handleEditCategory,
  handleDeleteCategory
}) => {

  const buttonDefs = [
    {
      id: 1,
      text: 'Add subcategory',
      clickHandler: handleAddCategory
    },
    {
      id: 2,
      text: 'Add slot',
      clickHandler: handleAddSlot
    },
    {
      id: 3,
      text: 'Edit',
      clickHandler: handleEditCategory
    },
    {
      id: 4,
      text: 'Delete',
      clickHandler: handleDeleteCategory
    }
  ]

  return (
    <>
      <div
        className='category-header justify-content-between d-flex align-items-center'
      >
        <span>
          {category.name}
        </span>
        <DropdownButtons buttonDefs={buttonDefs} />
      </div>
    </>
  )
}

export default CategoryHeader

CategoryHeader.propTypes = {
  category: PropTypes.shape({

  }).isRequired,
  handleAddCategory: PropTypes.func.isRequired,
  handleAddSlot: PropTypes.func.isRequired,
  handleEditCategory: PropTypes.func.isRequired,
  handleDeleteCategory: PropTypes.func.isRequired
}