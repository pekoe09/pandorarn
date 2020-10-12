import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import {
  MainBar,
  SideBar,
  MainContainer,
  AdminContainer
} from './index'
import { GradingContainer } from '../gradings'
import { EditCollection } from '../collections'
import { Register } from '../users'
import { register } from '../../actions'
import './layout.scss'

const Layout = (props) => {

  const [editCollectionIsOpen, setEditCollectionIsOpen] = useState(false)
  const [registrationIsOpen, setRegistrationIsOpen] = useState(false)

  const toggleEditCollection = () => {
    setEditCollectionIsOpen(!editCollectionIsOpen)
  }

  const toggleRegistration = () => {
    setRegistrationIsOpen(!registrationIsOpen)
  }

  return (
    <>
      <MainBar
        currentUser={props.currentUser}
        currentCollection={props.currentCollection}
        collections={props.collections}
        handleNewCollection={toggleEditCollection}
        handleRegistration={toggleRegistration}
      />
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          minHeight: '100vh'
        }}
      >
        <Switch>
          <Route path='/settings'>
            <AdminContainer>
              <Route path='/settings/gradings'>
                <GradingContainer />
              </Route>
            </AdminContainer>
          </Route>
          <Route path='/'>
            <SideBar
              collections={props.collections}
              currentCollection={props.currentCollection}
            />
            <div
              style={{
                flexGrow: 1,

              }}
            >
              <MainContainer
                collection={props.currentCollection}
                toggleEditCollection={toggleEditCollection}
              />
            </div>
          </Route>
        </Switch>
      </div>

      <EditCollection
        isOpen={editCollectionIsOpen}
        closeModal={toggleEditCollection}
        collection={null}
        error={''}
      />

      <Register
        isOpen={registrationIsOpen}
        closeModal={toggleRegistration}
        error={props.userError}
        register={props.register}
      />
    </>
  )
}

const mapStateToProps = store => {
  let currentCollection = store.collections.currentCollection
  let fullCategories = []
  /*currentCollection.categories.forEach(id => {
    fullCategories.push(store.categories.byId[id])
  })*/
  console.log('collection', currentCollection)
  console.log('all categories', store.categories.byId)
  console.log('hydrated categories', fullCategories)
  if (currentCollection) {
    currentCollection.categories = fullCategories
  }
  return {
    currentUser: store.users.currentUser,
    currentCollection,
    collections: store.collections.byId,
    userError: store.users.error
  }
}

export default connect(
  mapStateToProps,
  { register }
)(Layout)