import React, { Component } from "react"
import DragonAvatar from './dragonAvatar'
import {Button} from 'react-bootstrap'
import { BACKEND } from '../config'

class AccountDragonRow extends Component {
   state = {
     nickname: this.props.dragon.nickname,
     edit: false,
     isPublic: this.props.dragon.isPublic,
     saleValue: this.props.dragon.saleValue,
     sireValue: this.props.dragon.sireValue
   };

   updateNickname = event => {
     this.setState({nickname: event.target.value});
   }
  
   updateSaleValue = event => {
     this.setState({saleValue: event.target.value});
   }

   updateIsPublic = event => {
     this.setState({isPublic: event.target.checked});
   }

   updateSireValue = event => {
     this.setState({sireValue: event.target.value});
   }

  toggleEdit = () => {
    this.setState({edit: !this.state.edit});
  }

  save = () => {
     fetch(`${BACKEND.ADDRESS}dragon/update`,{
       method: 'PUT',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         dragonId: this.props.dragon.dragonId, 
         nickname: this.state.nickname,
         isPublic: this.state.isPublic,
         saleValue: this.state.saleValue,
         sireValue: this.state.sireValue
       })
     })
      .then(response => response.json())
      .then(json => {
        if(json.type === 'error') {
          alert(json.message);
        } else {
          this.toggleEdit();
        }
      })
       .catch(error => alert(error.message))  
  }
   
  get SaveButton(){
    return <Button style={{marginTop: "11%"}} onClick={this.save}>Save</Button>;
  } 

  get EditButton(){
    return <Button style={{marginTop: "11%"}} onClick={this.toggleEdit}>Edit</Button>;
  }

    render(){
       return(
         <div style={{display: 'grid'}} >
             <input 
                onChange={this.updateNickname} 
                type='text' 
                disabled={!this.state.edit}
                value={this.state.nickname}
              /> 
             <br/>
             <DragonAvatar dragon={this.props.dragon} />
             <br/>
             <div style={{marginTop: '5%', marginBottom: '15%'}}>
               <span>
                 Sale Value: {' '}
                 <input
                   className='account-dragon-row'
                   type='number'
                   disabled={!this.state.edit}
                   value={this.state.saleValue}
                   onChange={this.updateSaleValue}
                 />
               </span>{' '}
               <span>
                 Sire Value: {' '}
                 <input
                   className='account-dragon-row'
                   type='number'
                   disabled={!this.state.edit}
                   value={this.state.sireValue}
                   onChange={this.updateSireValue}
                 /> {' '}
               </span>
               <span>
                 Public: {' '}
                 <input
                   type='checkbox'
                   disabled={!this.state.edit}
                   checked={this.state.isPublic}
                   onChange={this.updateIsPublic}
                 />
               </span>
               {
                 this.state.edit ? this.SaveButton : this.EditButton
               } 
             </div>
         </div>
       );
    }
}

export default AccountDragonRow