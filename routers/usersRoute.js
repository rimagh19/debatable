/**
 * endpRoutes.js, responsabale for defining APIs/routes for users and registration
 * @author Rima Alghamdi, 2022
 */

/**
 * @require userService
 * @require express
 */
const usersServise = require('../services/usersService');
const Router = require('express').Router();

/**
 * user API routers
 */
Router.post('/register', usersServise.hashPassword, usersServise.registerUser); //regetration
Router.post('/login', usersServise.login); //login

module.exports = Router;