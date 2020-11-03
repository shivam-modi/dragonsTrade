const {v4: uuid } = require('uuid');
const { hash } = require('./helper');

class Session {
    constructor({username}){
        this.username = username;
        this.id = uuid();
    } 

    static parse(sessionString){
        const sessionData = sessionString.toString().split('|');

        return {
            username: sessionData[0],
            id: sessionData[1],
            sessionHash: sessionData[2]
        };
    }

    static verify(sessionString){
        const {username, id, sessionHash} = Session.parse(sessionString);
        
        const accountData = Session.accountData({username, id});

        return hash(accountData) === sessionHash;
    }

    toString(){
        const {username, id} = this;

        return Session.sessionString({username, id});
    }

    static accountData({username, id}){
        return `${username}|${id}`
    }

    static sessionString({username, id}){
      const accountdata = Session.accountData({username, id});

      return `${accountdata}|${hash(accountdata)}`;
    }
}

// const foo = new Session({username: 'foo'});

// const fooString = foo.toString();

// console.log('Session.parse(tostring)',  Session.parse(fooString));

// console.log('Session.verify(fooString)', Session.verify(fooString))

module.exports = Session;