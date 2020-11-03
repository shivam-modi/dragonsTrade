import React, { Component } from "react";
import {connect} from 'react-redux';
import AuthForm from "./components/authform";
import Home from "./components/home";


class App extends Component{
  render(){
    return(  
        this.props.account.loggedIn ? <Home/> : <AuthForm/>
      )
  }
} 

export default connect(
  ({account}) => ({account}),
  null
)(App)