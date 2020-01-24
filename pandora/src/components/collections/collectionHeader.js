import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { DropdownButtons } from '../common'

const CollectionHeader = ({
  collection,
  handleAddCategory,
  handleAddSlot,
  handleEditCollection,
  handleDeleteCollection
}) => {

  const buttonDefs = [
    {
      id: 1,
      text: 'Add category',
      clickHandler: handleAddCategory
    },
    {
      id: 2,
      text: 'Add slot',
      clickHandler: handleAddSlot
    },
    {
      id: 3,
      text: 'Edit collection',
      clickHandler: handleEditCollection
    },
    {
      id: 4,
      text: 'Delete collection',
      clickHandler: handleDeleteCollection
    }
  ]

  return (
    <>
      <div
        className='collection-header justify-content-between d-flex align-items-center'
        style={{ display: 'flex' }}
      >
        <span
          style={{ fontSize: '2em' }}
        >
          {collection && collection.name}
          {!collection && 'No collection selected'}
        </span>

        <DropdownButtons buttonDefs={buttonDefs} />

      </div>
      <hr
        style={{
          margin: '5px 0',
          background: '#526198'
        }}
      />
    </>
  )
}

export default CollectionHeader

CollectionHeader.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }))
  }),
  handleEditCollection: PropTypes.func.isRequired,
  handleAddCategory: PropTypes.func.isRequired,
  handleAddSlot: PropTypes.func.isRequired,
  handleDeleteCollection: PropTypes.func.isRequired
}