import React, {Component} from 'react';
import DragonAvatar from './dragonAvatar'
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {fetchDragon} from '../actions/dragon'
import fetchStates from '../reducers/fetchStates'
// const DEFAULT_DRAGON = {
//    dragonId: "",
//    generationId: "",
//    nickname: "", 
//    birthdate: "",
//    traits: []
// };

class Dragon extends Component {
    // state = { dragon: DEFAULT_DRAGON};

    // fetchDragon = () =>{
    //     fetch('http://localhost:3000/dragon/new')
    //         .then(response => response.json())
    //         .then(json => this.setState({dragon: json.dragon}))
    //         .catch(error => console.error('error', error));
    // } 

    // componentDidMount(){
    //     this.fetchDragon();
    // }

    get DragonView() {
        const {dragon} = this.props;

        if(dragon.dragon.status === fetchStates.error) {
        return <span>{dragon.dragon.message}</span>
        }

        return <DragonAvatar dragon ={dr.dragon}/>
    }

    render() {
        return (
           <div>
             <Button onClick={this.props.fetchDragon}>New Dragon</Button>   
             <br/> 
             {
                 this.DragonView
             }
           </div> 
        );
    }
}

// const mapStateProp = state =>{
//     const dragon = state.dragon
// }

// const componentConnector = connect(
//     mapStateProp,
//     {dragon}
// );

export default connect(
    ({ dragon }) => {return {dragon}},
    {fetchDragon} 
)(Dragon);

// ({dragon} => {{dragon}})