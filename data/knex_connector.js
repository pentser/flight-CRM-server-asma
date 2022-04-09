const knex=require('knex');
const config=require('config');

const connectedKnex=knex({
    client:'pg',
    version:'13',
    connection: config.get('pg')
})

module.exports=connectedKnex;