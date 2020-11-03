import React from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl } from 'react-bootstrap'
import { signup, login } from '../actions/account'
import fetchStates from '../reducers/fetchStates'

class AuthForm extends React.Component{
    state = {username: '', password: '', buttonClicked: false};

    updateUsername = event =>{
       this.setState({username: event.target.value}); 
    }

    updatePassword = event =>{
        this.setState({password: event.target.value})
    }

    signup = () => {
        this.setState({buttonClicked: true});
        const {username, password} = this.state
        this.props.signup({username, password})
    }

    login = () => {
        this.setState({buttonClicked: true});
        const {username, password} = this.state
        this.props.login({username, password});
    }

   get Error(){
        if( this.state.buttonClicked &&
            this.props.account.status === fetchStates.error
            ){
           return <div>{this.props.account.message}</div>
        }
    }

    render(){
        return (
            <div>
                <h2>Dragon Stack</h2>
                <FormGroup>
                    <FormControl
                       type='text'
                       onChange={this.updateUsername}
                       value={this.state.username}
                       placeholder='username'
                    />
                    <FormControl 
                       style={{marginTop: "15px"}}
                       type='password'
                       onChange={this.updatePassword}
                       value={this.state.password}
                       placeholder='password'
                    />
                    <div style={{marginTop: "15px"}} >
                        <Button onClick={this.login}>Log In</Button>
                        <span> or </span>
                        <Button onClick={this.signup}>Sign Up</Button>
                    </div>
                </FormGroup>
                <br/>
                {this.Error}
            </div>
        )
    }
}

export default connect(
    ({account}) =>({account}),
     {signup, login})
     (AuthForm)