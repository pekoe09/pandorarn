import React from 'react'
import { Navbar, Nav, NavItem, Image, Button, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Login, Logout } from '../../users'
import { CollectionSelect } from '../../collections'
import './mainbar.scss'

const MainBar = ({ currentUser, collections, handleNewCollection, handleRegistration }) => {

  const AnonymousItems = () => {
    return (
      <Nav
        style={{ width: "100%" }}
        className='justify-content-end'
      >
        <NavItem>
          <Login />
        </NavItem>
        <NavItem style={{ marginLeft: '10px' }}>
          <Button onClick={handleRegistration}>Sign up!</Button>
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
        <Row>
          <NavItem>
            <CollectionSelect collections={collections} />
          </NavItem>
          <NavItem style={{ marginLeft: '10px' }}>
            <Button onClick={handleNewCollection}>New</Button>
          </NavItem>
        </Row>
        <NavItem>
          <Logout />
        </NavItem>
      </Nav>
    )
  }

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