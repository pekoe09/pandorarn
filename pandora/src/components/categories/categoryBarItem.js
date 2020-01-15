import React from 'react'
import './categoryBarItem.scss'

const CategoryBarItem = ({ category }) => {

  const hasSubCategories = category.categories
  const getToggle = () => {
    if (hasSubCategories)
      return <button className='category-bar-item-toggle'>+</button>
    else
      return ''
  }


  return (
    <div
      className='category-bar-item justify-content-between'
      style={{ display: 'flex' }}
    >
      <span>{category.name}</span>
      {getToggle()}
    </div>
  )
}

export default CategoryBarItem