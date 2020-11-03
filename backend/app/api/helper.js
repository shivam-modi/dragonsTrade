const { hash } = require('../account/helper');
const Session = require('../account/session');
const AccountTable = require('../account/table');

const setSession = ({username, res, sessionId}) => {
   return new Promise((resolve, reject) => {
    let session, sessionString;   
    
    if(sessionId){
        sessionString = new Session({username}); 
        setSessionCoookie({sessionString, res});
        
        resolve({message: 'session restored'})
    } else{
        session = new Session({username});
        sessionString = session.toString();
            
        AccountTable.updateSessionId({
            sessionId: session.id,
            usernameHash: hash(username)
        })
        .then(() => {
            setSessionCoookie({sessionString, res})
            resolve({message: 'session created'}); 
        })
        .catch(error => reject(error)); 
      }
   });
}

const setSessionCoookie = ({sessionString, res}) => {
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        // httpOnly: true, // to access the cookie in frontend
    //    secure: true // used with https
    });  
}

const authenticatedAccount = (({sessionString}) =>{
    return new Promise((resolve, reject) => {
    if(!sessionString || !Session.verify(sessionString)){
        const error = new Error('Invalid Session');
        
        error.statusCode = 400;
 
        return reject(error);
     } else {
        const {username, id} = Session.parse(sessionString);
 
        AccountTable.getAccount({usernameHash: hash(username)})
           .then(({account}) => {
               const authenticated = account.sessionId === id;
 
               resolve({account, authenticated ,username})
           })
           .catch(error => reject(error));
     }
   });  
})

module.exports = { setSession, authenticatedAccount }