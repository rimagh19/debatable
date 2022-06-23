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

const updateDebate = async function(req, res){
    //get id from url (route parameter)
    const {debateId} = req.params;
    //get the data from the body
    const data = req.body;
    try{
        const updatedDebate = await debateRepo.updateDebate(debateId, data);
        await res.status(200).send(updatedDebate);
    }catch(err){
        await res.status(400).send(err);
    }
}

const deleteDebate = async function(req, res){
    let {debateID} = req.params;
    console.log({debateID});
    try{
        await debateRepo.markDebateAsDeleted(debateID);
        await res.status(204).end();
    }catch(err){
        console.log(err);
        await res.status(400).send(err);
    }

}

//export the addDebate objec (allow the servicesroutes to use it)
module.exports = {
    addDebate,
    updateDebate,
    deleteDebate
}