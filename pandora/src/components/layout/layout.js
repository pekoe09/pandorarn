import React, { useState } from 'react'
import { connect } from 'react-redux'
import MainBar from './mainbar'
import SideBar from './sidebar'
import { EditCollection } from '../collections'
import './layout.scss'

const Layout = (props) => {

  const [editCollectionIsOpen, setEditCollectionIsOpen] = useState(false)

  const toggleEditCollection = () => {
    setEditCollectionIsOpen(!editCollectionIsOpen)
  }

  return (
    <>
      <MainBar
        currentUser={props.currentUser}
        collections={props.collections}
        handleNewCollection={toggleEditCollection}
      />
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          minHeight: '100vh'
        }}
      >
        <SideBar
          collections={props.collections}
          currentCollection={props.currentCollection}
        />
        <div
          style={{
            flexGrow: 1,

          }}
        >
          <p>Main area</p>
        </div>
      </div>

      <EditCollection
        isOpen={editCollectionIsOpen}
        closeModal={toggleEditCollection}
        collection={null}
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