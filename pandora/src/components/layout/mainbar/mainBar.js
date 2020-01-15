import React from 'react'
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Login, Logout } from '../../users'
import { CollectionSelect } from '../../collections'
import './mainbar.scss'

const AnonymousItems = () => {
  return (
    <Nav
      style={{ width: "100%" }}
      className='justify-content-end'
    >
      <NavItem>
        <Login />
      </NavItem>
    </Nav>
  )
}

const LoggedInItems = ({ collections }) => {
  return (
    <Nav
      style={{ width: "100%", lineHeight: "2.5em" }}
      className='justify-content-between'
    >
      <NavItem>
        <CollectionSelect collections={collections} />
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Nav>
  )
}

const MainBar = ({ currentUser, collections }) => {
  return (
    <div className='mainbar'>
      <Navbar
        fixed='top'
        expand='lg'
      >
        <Navbar.Brand>

        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls='responsive-mainbar'
          className='custom-toggler'
        />
        <Navbar.Collapse id='responsive-mainbar'>
          {currentUser && <LoggedInItems collections={collections} />}
          {!currentUser && <AnonymousItems />}
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default MainBar