/**
 * endpRoutes.js, responsabale for defining APIs/routes for endorsemets
 * @author Rima Alghamdi, 2022
 */

/**
 * @require ../services/* $ nodejs.express
 */
 const EndoService = require('../services/endoService');
 const Router = require('express').Router();
 
 
 /**
  * endo API routers
  */
 Router.post('/:debateID/endorsements', EndoService.addOrUpdateEndo); // add-update endo
 
 /**
 * change @access
 */
 module.exports =  Router;
