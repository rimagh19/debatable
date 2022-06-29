/**
 * usersRepo.js, responsabale for managing users in the debate
 * @author Rima Alghamdi, 2022
 */

/**
 * @require knex
 */
 const knex = require('../knexHelper');

 /**
  * addUser, insert a new record into users table
  * @param {object} userData 
  * @returns user data
  */
 const addUser = async function(userData){
    return await knex.insert(userData).into('users').returning(['email', 'name', 'id', 'role', 'gender']);
 }

 /**
  * findUserByEmail, lookup user by email
  * @param {string} email 
  * @returns user dtata
  */
 const findUserByEmail = async function(email){
    return await knex
        .select('name', 'id', 'email', 'role', 'gender', 'password')
        .from('users')
        .where({email})
        .first();
 }

 module.exports = {
    addUser,
    findUserByEmail
}
