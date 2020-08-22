import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import RouteContext from '../app/RouteContext'
import { CollectionContext } from './index'
import { DropdownButtons } from '../common'

const CollectionHeader = ({
  collection
}) => {

  const routeContext = useContext(RouteContext)
  const {
    handleEditCollection,
    handleEditCategory
  } = routeContext
  const collectionContext = useContext(CollectionContext)
  const {
    handleDeleteCollection
  } = collectionContext

  const buttonDefs = [
    {
      id: 1,
      text: 'Add category',
      clickHandler: handleEditCategory
    },
    {
      id: 2,
      text: 'Add slot',
      clickHandler: handleEditCollection
    },
    {
      id: 3,
      text: 'Edit collection',
      clickHandler: handleEditCollection
    },
    {
      id: 4,
      text: 'Delete collection',
      clickHandler: handleDeleteCollection,
      targetValue: collection ? collection._id : null
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

        {collection && <DropdownButtons buttonDefs={buttonDefs} />}

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
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }))
  })
}