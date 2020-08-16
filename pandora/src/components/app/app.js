import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import RouteHandler from './routeHandler'
import {
  Layout
} from '../layout'

//import logo from './logo.svg';
import './app.css'

function App() {
  return (
    <RouteHandler>
      <Layout>
        <p>lapsielementti userrights branch</p>
      </Layout>
    </RouteHandler>
  );
}

export default App
