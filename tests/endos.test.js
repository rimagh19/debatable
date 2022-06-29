/**
 * endos.test.js, test endorements functions
 * @author rima alghamdi 2022
 */


/**
 * @requires mocha.describe and mocha.it
 * @requires chai 
 * @requires faker-json
 * @requires supertest
 * @requires ../app (main file)
 * @requires ./testhelper
 */
const {describe, it} = require('mocha');
const chai = require('chai');
chai.should();
const {faker} = require('@faker-js/faker');
const knex = require('../knexHelper');
const request = require('supertest');
const {app} = require('../app');
const testhelper = require('./testhelper');
const { hashPassword } = require('../services/usersService');

//var to hold test data
let testData;

describe('testing debatable project', function(){
    //b4 each, after testing
    beforeEach(async function(){
            await testhelper.clearDataBase();
            testData = await testhelper.prepareDataBase();

    });
    after(async function(){
        await testhelper.closeConnection();
    });

    //testing edorsements
    describe('testing edorsements', function(){

        //test starts
        it('should create an endorsements correctly if all conditions are met', async function(){
            
            const loginRespose = await request(app)
            .post('/users/login')
            .send({
                email: "rima1@gmail.com",
                password: '123456'
            })
            .expect(200); //send login api
            // TAKE JWT FROM LOGIN
            //ENSURE THAT JWT EXISTS
            //DECIDE ON A RANDOM OPINION, ['FOR', 'AGAINST','NEUTRAL']
            //USE TOKEN THE TOKEN AND RANDOM OPINION TO ADD ENDO TO RANDOM DEBATE
            //WHEN CALL ADD DEBATE SHOULD GET 200
            // ALSO RETURNED VALUES SHOULD MATCH ENTERED ONES
        });




    })
})