/**
 * Depaterepository.js, responsabale for managing debates in the debate
 * @author Rima Alghamdi, 2022
 */

/**
 * @require knex
 */
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
        .where({id: debate_id, isDeleted: false})
        .update(updateData)
        .returning("*");
}

/**
 * @param {object} debate_id
 * @returns val of 'is_deleted' => true
 */
const markDebateAsDeleted = async function(debate_id){
    return await knex('debates')
        .where({id: debate_id})
        .update({isDeleted: true});
}
/**
 * @params {integer} offset, limit
 * @returns {object} all (selected) debates 
 */
const getDebates = async function(offset, limit, searchTerm, orderBy){
    return await knex
        .select('id', 'title', 'descripttion', 'created_at')
        .from('debates')
        .where({isDeleted: false})
        .modify(function(query){
            if(searchTerm){
                query.whereILike('title', '%' + searchTerm + '%')
                .orWhereILike('descripttion', '%' + searchTerm + '%');
            }
        })
        .offset(offset)
        .limit(limit)
        .orderBy(orderBy);
}

/**
 * change @access
 */
module.exports = {
    addDebate,
    updateDebate,
    markDebateAsDeleted,
    getDebates
}