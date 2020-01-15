import React, { useState } from 'react'
import './categoryBarItem.scss'

const CategoryBarItem = ({ category }) => {

  const [isOpen, setIsOpen] = useState(false)

  const hasSubCategories = category.categories

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const getToggle = () => {
    if (hasSubCategories) {
      return (
        <button
          className='category-bar-item-toggle'
          onClick={toggleOpen}
        >
          {!isOpen && '+'}
          {isOpen && '-'}
        </button>)
    } else
      return ''
  }

  const getSubCategories = () => {
    if (isOpen) {
      return (
        <>
          <ul style={{ listStyleType: 'none' }}>
            {category.categories.map(c => <li><CategoryBarItem category={c} key={c.id} /></li>)}
          </ul>
        </>
      )
    } else {
      return ''
    }
  }

  return (
    <>
      <div
        className='category-bar-item justify-content-between'
        style={{ display: 'flex' }}
      >
        <span>{category.name}</span>
        {getToggle()}
      </div>
      {getSubCategories()}
    </>
  )
}

export default CategoryBarItem