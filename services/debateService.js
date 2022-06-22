/**
 * debatesService.js, responsabale for managing debates bussiness logic
 * Rima Alghamdi, 2022
 */

 const debateRepo = require('../repositories/debateRepository');


/**
 * @param {object} req => body(summary/sedcription),header,verb,parameters
 * @param {object} res => response (code/body) - eg. 404, page not found
 */
const addDebate = async function(req, res){
    let data = req.body;
    try{
        //hold the debate body in a const
        const inserteddebate = await debateRepo.addDebate(data);
        //send response
        await res.status(200).send(inserteddebate);
    }catch(err){
        //send error details
        await res.status(400).send(err);
    }
}

//export the addDebate objec (allow the servicesroutes to use it)
module.exports = {
    addDebate
}