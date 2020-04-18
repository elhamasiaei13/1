import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect, Route } from 'react-router';
import {connect} from 'react-redux';


const AuthorizedRouteContainer = ({ component: Component, ...rest, logged }) => (
    <Route {...rest} render={props => (
      logged ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          from: props.location
        }}/>
      )
    )}/>
)

const stateToProps = (state) => ({  
  logged: false 
  //logged: true
})

export default withRouter(connect(stateToProps)(AuthorizedRouteContainer))