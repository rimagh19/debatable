/**
 * helper.js, contains randoom functions that will be used in the project
 * @author Rima Alghamdi, 2022
 */

const lodash = require('lodash');
/**
 * parseOrderBy, return an array of fields, order
 * @param {String}
 *           @example "-created_at,title"
 * @return {Arrapoy} 
 *          @example [{column: "created_at", order: "desc"}
 *                    {column: "title"}]         
 */
const parseOrderBy = function(orderByString){
    const orderByStringArray = orderByString.split(',');
    return lodash.map(orderByStringArray, 
                function(field){
                    if(field.indexOf('-') === 0){
                        return {
                            column: field.substring(1),
                            order: 'desc'
                        }
                    }
                    return{
                        column: field
                    };
                });
}

module.exports = parseOrderBy;