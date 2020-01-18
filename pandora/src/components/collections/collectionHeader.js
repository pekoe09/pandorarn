import React from 'react'
import { Button } from 'react-bootstrap'

const CollectionHeader = ({ collection, handleAddCategory }) => {
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

        <Button
          size='mini'
          style={{ height: 'fit-content' }}
          onClick={handleAddCategory}
        >
          Add category
      </Button>

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