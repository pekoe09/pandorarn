import React from 'react'
import PropTypes from 'prop-types'
import { CollectionContainer } from '../../collections'

const MainContainer = ({ collection }) => {

  return (
    <div
      className='main-container'
      style={{ padding: '10px' }}
    >
      <CollectionContainer collection={collection} />
    </div>
  )
}

export default MainContainer

MainContainer.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }))
  })
}