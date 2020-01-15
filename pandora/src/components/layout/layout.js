import React from 'react'
import { connect } from 'react-redux'
import MainBar from './mainbar'
import SideBar from './sidebar'
import './layout.scss'

const Layout = (props) => {
  return (
    <>
      <MainBar
        currentUser={props.currentUser}
        collections={props.collections}
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