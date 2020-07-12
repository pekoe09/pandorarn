import React from 'react'
import { CategoryBarItem } from '../../categories'
import './sidebar.scss'

const SideBar = ({ collections, currentCollection }) => {

  const getCategoryItems = () => {
    let categoryItems = (currentCollection && currentCollection.categories) ?
      currentCollection.categories.map(c =>
        <CategoryBarItem category={c} key={c.id} />)
      : 'No categories in the collection'
    return categoryItems
  }

  return (
    <>
      <div className='sidebar'>
        {currentCollection && <h4>{currentCollection.name}</h4>}
        {!currentCollection && <h4>No collection</h4>}
        <hr color='white' />
        <div>
          {currentCollection && getCategoryItems()}
          {!currentCollection && <p>No collection selected</p>}
        </div>
      </div>
    </>
  )
}

export default SideBar