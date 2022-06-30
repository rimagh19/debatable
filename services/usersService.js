/**
 * usersSDervice.js, responsabale for managing users bussiness logic
 * @author Rima Alghamdi, 2022
 */

/**
 * @require bcryptjs
 * @require usersRepo
 * @require jsonwebtoken
 */
const bcrypt = require('bcryptjs');
const usersRepo = require('../repositories/usersRepo');
const jwt = require('jsonwebtoken');
const { indexOf } = require('lodash');

/**
 * hashPassword, hash given password and store it in  the body.password field
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns next() function -register user-
 */
const hashPassword =async function(req, res, next) {
    const {password} = req.body; //get password from user

    if(!password) {
            return res.status(400).send({"error": "enter a password"});
    } //if pass is not given return an error

    const hashedPassword = await bcrypt.hash(password, 12); //hash password

    req.body.password = hashedPassword; //store hashed password in body.password

    return next(); //next 

}

/**
 * registerUser, register user and store its data in DB
 * @param {objetc} req 
 * @param {object} res 
 */
const registerUser = async function(req, res) {
    const {name, email, password, role, gender} = req.body;
 
    const userData = {
        name, email, password, role, gender
    }; 

    try{
        const user = await usersRepo.addUser(userData);
        res.status(200).send(user);

    }catch(err){
        res.status(400).send(err);
    }

}

/**
 * login, check given email/password
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns jwt
 */
const login = async function(req, res, next){
    //get user data
    const {email, password} = req.body;
    //if emeail or pass not given return error
    if(!email || !password){
        return res.status(400).send({error: 'Email or password not provided'});
    }

    try{
    //check if email exists - if not return error
    const user = await usersRepo.findUserByEmail(email);
    if(!user){
        return res.status(403).send({error: 'email or password is not correct'});
    }
    //hash given password
    const isMatch = await bcrypt.compare(password, user.password);
    //check if hashed passwords matches - if not return error
    if(!isMatch){
        return res.status(403).send({error: 'email or password is not correct'});
    }
    //if matches make-return JWT
    const response = await signInUser(user);
    console.log(response);
    res.status(200).send(response);

    }catch(err){
        res.status(400).send(err);

    }
}

/**
 * sign in a user, creates jqt using user data
 * @param {object} user 
 * @returns jwt, user data
 */
const signInUser = async function(user){
    const{id, name, email, role} = user;
    const token = jwt.sign({id,name,email,role},
                            process.env.SECRET,
                            {expiresIn: "7 days"}
                        );
    return {token, user:{id,name,email,role}};
}

/**
 * isAuthenticated, check the given tokwn from the header
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 * @returns next() function
 */
const isAuthenticated = async function(req, res, next){
    const token = req.headers.token;
    if(!token){
        return res.status(403).send({"error": "Authentication failed -token missing-"});
    }

    try{
        const decodedUser = await jwt.verify(token,process.env.SECRET);
        req.user = decodedUser;
        next();

    }catch(err){
        return res.status(403).send({"error": "Authentication failed"});

    }
}

/**
 * isInRole, check if the role of the user belongs to the list 
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
const isInRole = function(roles, userRole){
    return async function(req, res, next){
        const role = req.user.role; //get role of the user
        if(indexOf(roles, userRole) == -1){
            return res.status(401).send({"error": "Not Authorized, Should be: " + roles.join(',') });
        }
        return next();
    }
}

module.exports = {
    hashPassword,
    registerUser,
    login,
    isAuthenticated,
    isInRole
}