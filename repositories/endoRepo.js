/**
 * endoRepo.js, responsabale for managing endorsements in the debate
 * @author Rima Alghamdi, 2022
 */

/**
 * @require knex
 */
const knex = require('../knexHelper');

 /**
  * @param {object} endoData {debateID, userID, opinion}
  * @returns {object} endoData {title,summary} - inserts or updates an endorsements
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

/**
 * change @access
 */
module.exports = {
    addOrUpdateEndo
 }