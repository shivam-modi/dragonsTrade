import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import history from './history'
import rootReducer from './reducers';
import './index.css';
import { fetchAuthenticated } from './actions/account'
import {Router, Switch, Route, Redirect} from 'react-router-dom'
import App from './App';
import AccountDragons from './components/accountDragons'
import PublicDragons from "./components/publicDragons";

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
)    

const store = createStore(
  rootReducer,
  enhancer
  );

//store.subscribe(() => console.log('store state update', store.getState()));
//console.log'store.getState()', store.getState())

// store.dispatch({type: 'foo'});
// store.dispatch({
//   type: "GENERATION_ACTION_TYPE",
//   generation: {generationId: 'glo', expiration: 'bar'} 
// });

// console.log('store.getState()', store.getState())


// const zooAction = generationActionCreator({
//    generationId: 'zoo' ,expiration: 'bar'
// });

// store.dispatch(zooAction);

// fetch('http://localhost:3000/generation')
//      .then(response => response.json())
//      .then(json => {
//        store.dispatch(generationActionCreator(json.generation))
//      })
//      .catch(error => console.error("error", error));

const AuthRoute = props => {
  if(!store.getState().account.loggedIn){
    return <Redirect to={{pathname: "/"}} />
  }

  const {component, path} = props;
  return <Route path={path} component={component}/>
}

store.dispatch(fetchAuthenticated())
   .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <React.StrictMode>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={App}/>
              <AuthRoute exact path="/account-dragons" component={AccountDragons} />
              <AuthRoute path='/public-dragons' component={PublicDragons} />
            </Switch>
          </Router>
        </React.StrictMode>
      </Provider>,
      document.getElementById('root')
    );    
   });