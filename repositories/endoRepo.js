/**
 * endoRepo.js, responsabale for managing endorsements in the debate
 * Rima Alghamdi, 2022
 */


 //load knex from knex helper - two dot to jump one folder
 const knex = require('../knexHelper');
 
 /**
  * @param {object} debateData {title,summary}
  * @returns {object} debateData {title,summary} - inserts a new debate to the debates tabel and
  */
 const addOrUpdateEndo = async function(debateID, userID, opinion){
     return await knex
         .insert({debate_id : debateID,
            user_id : userID,
            opinion})
         .into('endorsemets')
         .onConflict(['debate_id', 'user_id'])
         .merge()
         .returning('*');  
 }
 
 //export the addDebate objec (allow the debatessservice to use it)
 module.exports = {
    addOrUpdateEndo
 }