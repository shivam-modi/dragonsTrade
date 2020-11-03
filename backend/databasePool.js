const { Pool } = require('pg');
const databaseConfig = require('./secrets/databaseConfiguration');

const pool = new Pool(databaseConfig);

module.exports = pool;





// //verification
// pool.query('SELECT * FROM generation', (error, response)=>{
//     if(error) return console.log('error', error)
     
//     console.log('response.rows', response.rows)
// })