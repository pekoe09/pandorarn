import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  saveCollection,
  deleteCollection,
  changeCollection
} from '../../actions'
import { CollectionContext } from './index'

const CollectionHandler = ({
  saveCollection,
  deleteCollection,
  changeCollection,
  children,
  error,
  history
}) => {

  const handleSaveCollection = async (collection) => {
    console.log('saving collection', collection)
    await saveCollection(collection)
    console.log('collection saved successfully', collection)
    console.log('error state', error)
    console.log('is not error', !error)
    if (!error) {
      history.push('/collections')
    }
  }

  const handleDeleteCollection = async (collectionId) => {
    console.log('deleting collection', collectionId)
    await deleteCollection(collectionId)
    if (!error) {
      console.log('changing collection?')
      changeCollection()
    }
  }

  const handlers = {
    handleSaveCollection,
    handleDeleteCollection
  }

  return (
    <CollectionContext.Provider value={handlers}>
      {children}
    </CollectionContext.Provider>
  )
}

const mapStateToProps = store => ({
  error: store.collections.collectionError
})

export default withRouter(connect(
  mapStateToProps,
  {
    saveCollection,
    deleteCollection,
    changeCollection
  }
)(CollectionHandler))