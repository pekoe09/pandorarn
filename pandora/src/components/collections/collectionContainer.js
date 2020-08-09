import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  changeCollection,
  deleteCollection
} from '../../actions'
import {
  CollectionHeader,
  EditCollection
} from './index'
import { CategoryListings } from '../categories'

const CollectionContainer = ({ collection, changeCollection, deleteCollection, error }) => {

  const [editCollectionIsOpen, setEditCollectionIsOpen] = useState(false)

  const toggleEditCollection = () => {
    setEditCollectionIsOpen(!editCollectionIsOpen)
  }

  const handleDeleteCollection = async () => {
    console.log('deleting collection', collection._id)
    await deleteCollection(collection._id)
    if (!error) {
      console.log('changing collection?')
      changeCollection()
    }
  }

  const handleAddCategory = () => {
    console.log('adding category')
  }

  const handleEditCategory = (category) => {
    console.log('editing category', category)
  }

  const handleDeleteCategory = (categoryId) => {
    console.log('deleting category', categoryId)
  }

  const handleAddSlot = () => {
    console.log('adding slot')
  }

  const handleEditSlot = (slot) => {
    console.log('editing slot', slot)
  }

  const handleDeleteSlot = (slotId) => {
    console.log('deleting slot', slotId)
  }

  const handleAddItem = () => {
    console.log('adding item')
  }

  const handleEditItem = (item) => {
    console.log('editing item', item)
  }

  const handleDeleteItem = (itemId) => {
    console.log('deleting item', itemId)
  }

  const handleAddSighting = () => {
    console.log('adding sighting')
  }

  const handleEditSighting = (sighting) => {
    console.log('editing sighting', sighting)
  }

  const handleDeleteSighting = (sightingID) => {
    console.log('deleting sighting', sightingID)
  }

  return (
    <>
      <CollectionHeader
        collection={collection}
        handleEditCollection={toggleEditCollection}
        handleDeleteCollection={handleDeleteCollection}
        handleAddCategory={handleAddCategory}
        handleEditCategory={handleEditCategory}
        handleDeleteCategory={handleDeleteCategory}
        handleAddSlot={handleAddSlot}
        handleEditSlot={handleEditSlot}
        handleDeleteSlot={handleDeleteSlot}
        handleAddItem={handleAddItem}
        handleEditItem={handleEditItem}
        handleDeleteItem={handleDeleteItem}
        handleAddSighting={handleAddSighting}
        handleEditSighting={handleEditSighting}
        handleDeleteSighting={handleDeleteSighting}
      />
      {collection
        && collection.categories
        && <CategoryListings
          categories={collection.categories}
          handleAddCategory={handleAddCategory}
          handleEditCategory={handleEditCategory}
          handleDeleteCategory={handleDeleteCategory}
          handleAddSlot={handleAddSlot}
          handleEditSlot={handleEditSlot}
          handleDeleteSlot={handleDeleteSlot}
          handleAddItem={handleAddItem}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
          handleAddSighting={handleAddSighting}
          handleEditSighting={handleEditSighting}
          handleDeleteSighting={handleDeleteSighting}
        />}

      <EditCollection
        isOpen={editCollectionIsOpen}
        closeModal={toggleEditCollection}
        collection={collection}
      />
    </>
  )
}

const mapStateToProps = store => ({
  deletingCollection: store.collections.deletingCollection,
  error: store.collections.collectionError
})

export default connect(
  mapStateToProps,
  {
    changeCollection,
    deleteCollection
  }
)(CollectionContainer)

CollectionContainer.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }))
  }),
  deleteCollection: PropTypes.func.isRequired
}