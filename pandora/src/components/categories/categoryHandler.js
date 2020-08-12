import React from 'react'
import { connect } from 'react-redux'
import {
  saveCategory,
  deleteCategory
} from '../../actions'
import { CategoryContext } from './index'

const CategoryHandler = ({
  saveCategory,
  deleteCategory,
  children
}) => {

  const handleSaveCategory = async (category) => {
    console.log('saving category')
    await saveCategory(category)
  }

  const handleDeleteCategory = async (categoryId) => {
    console.log('deleting category', categoryId)
    await deleteCategory(categoryId)
  }

  const handlers = {
    handleSaveCategory,
    handleDeleteCategory
  }

  return (
    <CategoryContext.Provider value={handlers}>
      {children}
    </CategoryContext.Provider>
  )
}

export default connect(
  null,
  {
    saveCategory,
    deleteCategory
  }
)(CategoryHandler)