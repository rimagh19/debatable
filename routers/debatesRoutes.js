/**
 * debatesRoutes.js, responsabale for defining APIs/routes for debates
 * @author Rima Alghamdi, 2022
 */

/**
 * @require ../services/* $ nodejs.express
 */
const debateService = require('../services/debateService');
const {isAuthenticated, isInRole} = require('../services/usersService');
const Router = require('express').Router();


 /**
  * debate API routers

  */
Router.post('/', isAuthenticated, isInRole(['user']) , debateService.addDebate); // addDebate
Router.put('/debate/:debateId', isAuthenticated, isInRole(['admin']), debateService.updateDebate); // updateDebate  
Router.delete('/debate/:debateID', isAuthenticated, isInRole(['admin']), debateService.deleteDebate); // deleteDebate
Router.get('/', debateService.parseOrderByForDebates ,debateService.getDebate); // getDebate

/**
 * change @access
 */
module.exports =  Router;