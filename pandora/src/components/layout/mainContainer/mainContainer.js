import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  CollectionContainer,
  CollectionHandler,
  EditCollection
} from '../../collections'

const MainContainer = ({ collection, history }) => {

  const handleEditCollection = () => {
    history.push('/collections/edit')
  }

  return (
    <div
      className='main-container'
      style={{ padding: '10px' }}
    >
      <Switch>
        <Route exact path='/collections'>
          <CollectionHandler>
            <CollectionContainer
              collection={collection}
              handleEditCollection={handleEditCollection}
            />
          </CollectionHandler>
        </Route>

        <Route path='/collections/edit'>
          <CollectionHandler>
            <EditCollection
              collection={collection}
            />
          </CollectionHandler>
        </Route>
        <Route path='/collections/create'>
          <CollectionHandler>
            <EditCollection
              collection={null}
            />
          </CollectionHandler>
        </Route>
      </Switch>
    </div>
  )
}

export default withRouter(MainContainer)

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