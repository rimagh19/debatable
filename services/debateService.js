/**
 * debatesService.js, responsabale for managing debates bussiness logic
 * @author Rima Alghamdi, 2022
 */

/**
 * @require ../repositories
 */
 const debateRepo = require('../repositories/debateRepository');
 

/**
 * addDebate
 * @param {object} req              body,header,verb,params
 * @param {object} res              response (code/body) - eg. 404, page not found
 */
const addDebate = async function(req, res){
    //get debtaeData
    let data = req.body;
    
    data.user_id = req.user.id;

    try{
        const inserteddebate = await debateRepo.addDebate(data);
        await res.status(200).send(inserteddebate);
    }catch(err){
        await res.status(400).send(err);
    }
}

/**
 * UpdateDebate
 * @param {object} req              body,header,verb,params
 * @param {object} res              response (code/body) - eg. 404, page not found
 */
const updateDebate = async function(req, res){
    //get id
    const {debateId} = req.params;
    //get data
    const data = req.body;

    try{
        const updatedDebate = await debateRepo.updateDebate(debateId, data);
        await res.status(200).send(updatedDebate);
    }catch(err){
        await res.status(400).send(err);
    }
}

/**
 * deleteDebate
 * @param {object} req              body,header,verb,params
 * @param {object} res              response (code/body) - eg. 404, page not found
 */
const deleteDebate = async function(req, res){
    // get debateId
    let {debateID} = req.params;

    try{
        await debateRepo.markDebateAsDeleted(debateID);
        await res.status(204).end();
    }catch(err){
        await res.status(400).send(err);
    }

}

/**
 * getDebate
 * @param {object} req              body,header,verb,params,query
 * @param {object} res              response (code/body) - eg. 404, page not found
 */
const getDebate = async function(req, res){
    //get search data
    let {offset, limit, searchTerm, orderBy} = req.query;

    // default offset if null
    offset = offset?? 0;
    // limit restriction
    if(limit > 100) limit = 100;

    try{
    const debates = await debateRepo.getDebates(offset, limit, searchTerm, orderBy);
    res.status(200).send(debates);
    }catch(err){
        res.status(400).send(err);
    }

}

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next               move forward to the nex function
 * @require helpers/helpers.js
 */
const parseOrderBy = require('../helpers/helpers.js');
const parseOrderByForDebates = async function(req, res, next){
    const {orderBy} = req.query;

    if(!orderBy){
        req.query.orderBy = [{column: 'created_at', order: 'desc'}];
    }else{
        req.query.orderBy = parseOrderBy(req.query.orderBy);
    }
    
    return next();
}


/**
 * change @access
 */
module.exports = {
    addDebate,
    updateDebate,
    deleteDebate,
    getDebate,
    parseOrderByForDebates
}