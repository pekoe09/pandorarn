import React from 'react'
import { connect } from 'react-redux'
import MainBar from './mainbar'

const Layout = (props) => {
  return (
    <div>
      <MainBar currentUser={props.currentUser} />
      <div style={{ height: '50px' }}>
        <p>placeholder</p>
      </div>
      {props.children}
    </div>
  )
}

const mapStateToProps = store => ({
  currentUser: store.users.currentUser
})

export default connect(
  mapStateToProps
)(Layout)