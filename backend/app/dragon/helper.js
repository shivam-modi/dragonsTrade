const pool = require("../../databasePool");
const DragonTable = require("./dragonTable");
const Dragon = require("./dragon");
const { response } = require("express");

const getDragonWithTraits = ({dragonId}) => {
   return Promise.all([
       DragonTable.getDragon({dragonId}),
       new Promise((resolve, reject) =>{
          pool.query(
              `SELECT "traitType", "traitValue"
               FROM trait
               INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
               WHERE dragonTrait."dragonId" = $1`,
               [dragonId],
               ( error, response) =>{
                  if(error) return reject(error);

                  resolve(response.rows); 
                  // console.log(response.rows);
             }
          )
       })
    ])
    .then(([dragon, dragonTraits]) =>{
      return new Dragon({
         // ...dragon, dragonId, traits: dragonTraits.traitId
         dragonId: dragonId,
         nickname: dragon.nickname,
         birthdate: dragon.birthdate,
         generationId: dragon.generationID,
         traits: dragonTraits
      })
      //  dragon.dragonId = dragonId;
      //  dragon.traits = dragontraits
       
      //  return dragon;
    }) 
    .catch(
        error => console.error(error)
    );
};

const getPublicDragons = () => {
   return new Promise((resolve, reject) =>{
     pool.query(
        'SELECT id FROM dragon WHERE "isPublic" = "TRUE"',
        (error, response) => {
           if(error) return reject(error);

           const publicDragonsRows = response.rows;
           Promise.all(
              publicDragonsRows.map(
                 ({ id }) => getDragonWithTraits({ dragonId: id }))
           ).then(dragons => resolve({dragons}))
            .catch(error => reject(error)); 
       } 
     )
   });
}

// getDragonWithTraits({dragonId: 14})
//    .then(dragon => console.log('dragon', dragon))
//    .catch(error => console.error('error', error));

module.exports = { getDragonWithTraits, getPublicDragons };