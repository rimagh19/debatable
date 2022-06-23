/**
 * endpRoutes.js, responsabale for defining APIs/routes for endorsemets
 * Rima Alghamdi, 2022
 */

 const EndoService = require('../services/endoService');
 const Router = require('express').Router();
 
 
 /**
  * add endo router
  */
 //a new api with the ver= post, path= debate, using= debateService, target=addDebate repo 
 Router.post('/:debateID/endorsements', EndoService.addOrUpdateEndo);
 
 module.exports =  Router;
