import React, {Component} from "react"
import { Button } from "react-bootstrap";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { fetchAccountDragons } from '../actions/accountDragons'
import AccountDragonRow from "./accountDragonRow";

class AccountDragons extends Component {
  componentDidMount(){
      this.props.fetchAccountDragons();
  }

  render(){
      return (
          <div>
               <Link to="/" className="text-right"><Button>Home</Button></Link>   
              <h3 style={{marginTop: "3rem"}}>Account Dragons</h3>
                  { this.props.accountDragons.dragons.map(dragon => {
                        return (
                            <div key={dragon.dragonId} style={{height: "22rem"}}>
                                <AccountDragonRow dragon={dragon}/>
                                <hr/>
                            </div>
                        )  
                        })  
                  }
          </div>
      )
  }
}

//<a> is not used because it refreshes entire app and then transfer to the page while <Link> tag don't refreshes

export default connect(
    ({accountDragons}) => ({accountDragons}),
    { fetchAccountDragons },
)(AccountDragons);