/**
 * debatesRoutes.js, responsabale for defining APIs/routes for debates
 * @author Rima Alghamdi, 2022
 */

/**
 * @require ../services/* $ nodejs.express
 */
const debateService = require('../services/debateService');
const Router = require('express').Router();


 /**
  * debate API routers

  */
Router.post('/', debateService.addDebate); // addDebate
Router.put('/debate/:debateId', debateService.updateDebate); // updateDebate  
Router.delete('/debate/:debateID', debateService.deleteDebate); // deleteDebate
Router.get('/', debateService.parseOrderByForDebates ,debateService.getDebate); // getDebate

/**
 * change @access
 */
module.exports =  Router;