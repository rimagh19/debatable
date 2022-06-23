/**
 * EndoService.js, responsabale for managing endorsements bussiness logic
 * Rima Alghamdi, 2022
 */

 const endoRepo = require('../repositories/endoRepo');


/**
 * @param {object} req => body(summary/sedcription),header,verb,parameters
 * @param {object} res => response (code/body) - eg. 404, page not found
 */

const addOrUpdateEndo = async function(req, res){
    //get ID
    const {debateID} = req.params;
    //get data
    let data = req.body;
    try{
        const insertedEndo = await endoRepo.addOrUpdateEndo(debateID,
                                                            data.user_id, 
                                                            data.opinion);
        await res.status(200).send(insertedEndo);
    }catch(err){
        await res.status(400).send(err);
    }
}

module.exports = {
    addOrUpdateEndo
}