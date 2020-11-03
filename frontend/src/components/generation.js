import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGeneration } from '../actions/generation'
import fetchStates from "../reducers/fetchStates"

//const DEFAULT_GENERATION = {generationId: '', expiration: ''};

const MIN_DELAY = 3000;

class Generation extends Component{
    //state = {generation: DEFAULT_GENERATION}
    // constructor(){
    //     super();
    //     // this.fetchGeneration = this.fetchGeneration.bind(this);
    // }

    timer = null;
    componentDidMount(){
        this.fetchNextGeneration();
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
    }

    // fetchGeneration = () =>{
    //     fetch('http://localhost:3000/generation')
    //        .then(response => response.json())
    //        .then(
    //            json => {
    //              // this.setState({generation : json.generation});
    //             //    this.props.dispatch(
    //             //        fetchGeneration(json.generation)
    //             //        );
    //             this.props.dispatchGeneration(json.generation)
    //             })
    //        .catch(error => console.error(error));
    //     };

    fetchNextGeneration = () => {
        this.props.fetchGeneration();

         let delay = new Date(this.props.generation.expiration).getTime()-
                      new Date().getTime();
            
             if(delay < MIN_DELAY) {
                delay = MIN_DELAY;
             }          

            //  console.log(delay.toString);
        this.timer = setTimeout(() => this.fetchNextGeneration(), delay < MIN_DELAY ? MIN_DELAY : delay);
    }

    render(){ 
       console.log('this.props', this.props) 
       const { generation } = this.props; 

    //    if(generation.status === fetchStates.fetching){
    //        return <div>...</div>;
    //    }
       if(generation.status === fetchStates.error){
           return <div>{generation.message}</div>;
       }
        return(
        <div>
           <h3>Generation {generation.generationId}.</h3>
           <h4>Expires on: {Date(generation.expiration).toString()}</h4>
        </div>
        )
    }
}

const mapStateProps = state => {
    const generation = state.generation;
    return {generation};
};
// const mapDispatchToProps = dispatch =>{
//   return {
//     //   dispatchGeneration: generation => dispatch(
//     //       generationActionCreator(generation)  
//     //   ), 
//       fetchGeneration: () => fetchGeneration(dispatch)
//   }
// };
const componentConnector = connect(
    mapStateProps,
    { fetchGeneration }
    );

export default componentConnector(Generation); 