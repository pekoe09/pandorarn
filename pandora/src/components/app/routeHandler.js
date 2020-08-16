import React from 'react'
import { withRouter } from 'react-router-dom'
import RouteContext from './RouteContext'

const RouteHandler = ({ history, children }) => {

  const handleEditCollection = () => {
    history.push('/collections/edit')
  }

  const handleEditCategory = categoryId => {
    if (categoryId) {
      history.push(`/categories/edit/${categoryId}`)
    } else {
      history.push('/categories/create')
    }
  }

  const handlers = {
    handleEditCollection,
    handleEditCategory
  }

  return (
    <RouteContext.Provider value={handlers}>
      {children}
    </RouteContext.Provider>
  )
}

export default withRouter(RouteHandler)