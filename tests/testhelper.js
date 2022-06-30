const knex = require ('../knexHelper');
const {faker} = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

/**
 * clearDataBase, delete all records in the DataBase
 */
const clearDataBase = async function(){
    return await knex.raw('TRUNCATE debates, endorsemets, users');
}

/**
 * closeConnection, closes the connection to the database
 */
const closeConnection = async function(){
    return knex.destroy();
}

/**
 * addUsers, add fake records to users
 */
const addUsers = async function(){
    const hashedPassword = await bcrypt.hash('123456', 12);

    await knex('users').insert([
        {
            name:"rima 1",
            email: "rima1@gmail.com",
            role: "admin",
            gender: "female",
            password: hashedPassword
        },
        {
            name:"rima 2",
            email: "rima2@gmail.com",
            role: "user",
            gender: "female",
            password: hashedPassword
        }
    ]);

}

/**
 * prepareDataBase, insert virtual data into the database
 */
const prepareDataBase = async function(){
    await addUsers(); //add users

    const user = await knex.select('id') // get the first user with role "user", user = {id: u7e8oiqw3hui}
            .from('users')
            .where({role: 'user'})
            .first();

    const debate = await knex('debates') //insert fake debate into debates
        .insert({ 
            title: faker.lorem.sentence(3),
            descripttion: faker.lorem.sentence(10),
            user_id: user.id
        })
        .returning('*');
    return {user, debate: debate[0]} //return user + first debate

}

module.exports = {
    closeConnection,
    clearDataBase,
    prepareDataBase
}