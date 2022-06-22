/**
 * Depaterepository.js, responsabale for managing debates in the debate
 * Rima Alghamdi, 2022
 */

const knexHelper = require("../knexHelper")

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

//export the addDebate objec (allow the debatessservice to use it)
module.exports = {
    addDebate
}