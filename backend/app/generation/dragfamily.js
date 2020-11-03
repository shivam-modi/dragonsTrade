const Dragon = require('../dragon/dragon');
const { SECONDS, REFRESH_RATE } = require('../config');
const { default: account } = require('../../../frontend/src/reducers/account');

const refreshRate = REFRESH_RATE * SECONDS;


class Generation {
    constructor(){
        this.accountIds = new Set();
        this.generationId = undefined;
        this.expiration = this.calculateExpiration();
   }

   calculateExpiration(){
    const expirationPeriod = Math.floor(Math.random() * (refreshRate/2));
    const msUntilExpiration = Math.random() < 0.5 ?
      refreshRate - expirationPeriod:
      refreshRate + expirationPeriod;
    
    return new Date(Date.now() + msUntilExpiration);  
  }

  newDragon({accountId}){
      if(Date.now() > this.expiration){
          throw new Error(`This generation is expired ${this.expiration}`);
      }
      if(this.accountIds.has(accountId )){
        throw new Error('You alreay has a dragon from thie generation');
      }

      this.accountIds.add(accountId);

      return new Dragon({
        generationId: this.generationId
      });
  }
}
module.exports = Generation;