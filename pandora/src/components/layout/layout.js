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

  console.log('layout has collections', props.collections)
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
          <Route path='/gradings'>
            <AdminContainer>
              <GradingContainer />
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
        error={''}
      />
    </>
  )
}

const mapStateToProps = store => ({
  currentUser: store.users.currentUser,
  currentCollection: store.collections.currentCollection,
  collections: store.collections.items
})

export default connect(
  mapStateToProps
)(Layout)