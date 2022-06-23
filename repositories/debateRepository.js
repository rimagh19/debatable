/**
 * Depaterepository.js, responsabale for managing debates in the debate
 * Rima Alghamdi, 2022
 */

//load knex from knex helper - two dot to jump one folder
const knex = require('../knexHelper');

/**
 * @param {object} debateData {title,summary}
 * @returns {object} debateData {title,summary} - inserts a new debate to the debates tabel and
 */
const addDebate = async function(debateData){
    return await knex
        .insert(debateData)
        .into('debates')
        .returning('*');  
}
/**
 * @param {object} update debate {debateID, {title,summary}}
 * @returns {object} debateData {title,summary} - inserts a new debate to the debates tabel and
 */
const updateDebate = async function(debate_id, updateData){
    return await knex('debates')            
        .where({id: debate_id})
        .update(updateData)
        .returning("*");
}

const markDebateAsDeleted = async function(debate_id){
    return await knex('debates')
        .where({id: debate_id})
        .update({isDeleted: true});
}
//export the addDebate objec (allow the debatessservice to use it)
module.exports = {
    addDebate,
    updateDebate,
    markDebateAsDeleted
}