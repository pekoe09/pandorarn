import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  CollectionContainer,
  CollectionHandler,
  EditCollection
} from '../../collections'
import {
  CategoryHandler,
  EditCategory
} from '../../categories'

const MainContainer = ({ collection, history }) => {

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
        <Route path='/categories/edit/:id'>
          <CategoryHandler>
            <EditCategory />
          </CategoryHandler>
        </Route>
        <Route path='/categories/create'>
          <CategoryHandler>
            <EditCategory />
          </CategoryHandler>
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