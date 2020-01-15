import React from 'react'
import { connect } from 'react-redux'
import MainBar from './mainbar'
import './layout.scss'

const Layout = (props) => {
  return (
    <div>
      <MainBar
        currentUser={props.currentUser}
        collections={props.collections}
      />
      <div style={{ height: '50px' }}>
        <p>placeholder</p>
      </div>
      {props.children}
    </div>
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