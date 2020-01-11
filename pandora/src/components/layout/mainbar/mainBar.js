import React from 'react'
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const AnonymousItems = () => {
  return (
    <Nav>
      <NavItem>
        <p>anonymous</p>
      </NavItem>
    </Nav>
  )
}

const LoggedInItems = () => {
  return (
    <Nav>
      <NavItem>
        <p>loggedin</p>
      </NavItem>
    </Nav>
  )
}

const MainBar = ({ currentUser }) => {
  return (
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
  )
}

export default MainBar