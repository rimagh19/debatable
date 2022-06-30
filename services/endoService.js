/**
 * EndoService.js, responsabale for managing endorsements bussiness logic
 * @author Rima Alghamdi, 2022
 */

/**
 * @require ../repositories
 */
 const endoRepo = require('../repositories/endoRepo');


/**
 * add or update endo
 * @param {object} req              body,header,verb,params
 * @param {object} res              response (code/body) - eg. 404, page not found
 */
const addOrUpdateEndo = async function(req, res){
    //get ID
    const {debateID} = req.params;
    //get data (opinion, user_id)
    let data = req.body;

    try{
        const insertedEndo = await endoRepo.addOrUpdateEndo(debateID,
                                                            req.user.id, 
                                                            data.opinion);
        await res.status(200).send(insertedEndo);
    }catch(err){
        console.log(err);
        await res.status(400).send(err);
    }
}

/**
 * change @access
 */
module.exports = {
    addOrUpdateEndo
}