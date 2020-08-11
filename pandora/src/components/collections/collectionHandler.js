import React from 'react'
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
  error
}) => {

  const handleSaveCollection = async (collection) => {
    console.log('saving collection', collection)
    await saveCollection(collection)
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
  error: store.collections.error
})

export default connect(
  mapStateToProps,
  {
    saveCollection,
    deleteCollection,
    changeCollection
  }
)(CollectionHandler)