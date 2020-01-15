import React from 'react'
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Login, Logout } from '../../users'
import './mainbar.scss'

const AnonymousItems = () => {
  return (
    <Nav style={{ width: "100%" }}>
      <NavItem style={{ width: "100%" }}>
        <Login />
      </NavItem>
    </Nav>
  )
}

const LoggedInItems = () => {
  return (
    <Nav style={{ width: "100%" }}>
      <NavItem style={{ width: "100%" }}>
        <Logout />
      </NavItem>
    </Nav>
  )
}

const MainBar = ({ currentUser }) => {
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
          {currentUser && <LoggedInItems />}
          {!currentUser && <AnonymousItems />}
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default MainBar