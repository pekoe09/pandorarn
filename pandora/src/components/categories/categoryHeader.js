import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButtons } from '../common'
import './categoryHeader.scss'

const CategoryHeader = ({
  category,
  handleAddCategory
}) => {

  const buttonDefs = [
    {
      id: 1,
      text: 'Add',
      clickHandler: handleAddCategory
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
  handleAddCategory: PropTypes.func.isRequired
}