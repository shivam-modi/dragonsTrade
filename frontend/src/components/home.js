import React,{ Component } from 'react'
import Generation from "./generation"
import Dragon from "./dragon"
import {connect} from "react-redux"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { logout } from '../actions/account'
import AccountInfo from './accountInfo'

class Home extends Component {
    render(){
      return (
         <>
           <div>
              <Button className='logout-button' onClick={this.props.logout}>
                Log Out
              </Button> 
              <h2>Dragon Stack</h2>
              <Generation/>
              <Dragon/>
              <hr style={{marginTop: '10%'}}/>
              <AccountInfo />
              <hr/>
              <Link to="/account-dragons">Account Dragons</Link>
              <Link to="/public-dragons">Public Dragons</Link>
          </div>
         </>
      )
    }
}

// fetch('http://localhost:3000/account/dragons', {
//   credentials: 'include'
// }).then(response => response.json())
//   .then(json => console.log('account dragons', json)); 

export default connect( null, {logout} )(Home)