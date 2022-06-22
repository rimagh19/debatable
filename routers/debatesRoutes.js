/**
 * debatesRoutes.js, responsabale for defining APIs/routes for debates
 * Rima Alghamdi, 2022
 */

const debateService = require('../services/debateService');
const Router = require('express').Router();


/**
 * add Debate router
 */
//a new api with the ver= post, path= debate, using= debateService, target=addDebate repo 
Router.post('/',debateService.addDebate);

module.exports = Router;