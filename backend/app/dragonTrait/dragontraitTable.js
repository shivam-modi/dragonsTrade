const pool = require('../../databasePool')
const TraitTable = require('../trait/traitTable')

class DragonTraitTable{
   static storeDragonTrait({dragonId, traitType, traitValue}){
       return new Promise((resolve, reject) =>{
           TraitTable.getTraitId({traitType, traitValue})
              .then(({traitId}) =>{
                  pool.query(
                      `INSERT INTO dragonTrait("traitId", "dragonId")
                      VALUES($1, $2) RETURNING "dragonId"`,
                      [traitId, dragonId],
                      (error, response) => {
                          if(error) return reject(error);

                          resolve();
                      }
                    )
              })
              .catch(error => console.error(error));
       });
   }
}

module.exports = DragonTraitTable;