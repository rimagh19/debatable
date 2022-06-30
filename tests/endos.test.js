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
const app = require('../app');
const testhelper = require('./testhelper');
const { hashPassword } = require('../services/usersService');
const knexHelper = require('../knexHelper');

//var to hold test data
let testData;

describe('testing debatable project', async function(){
    //b4 each, after testing
    beforeEach(async function(){
            await testhelper.clearDataBase();
            testData = await testhelper.prepareDataBase();

    });
    after(async function(){
        await testhelper.closeConnection();
    });

    //testing edorsements
    describe('testing edorsements', async function(){

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
            const token = loginRespose.body.token;
            
            //ENSURE THAT JWT EXISTS
            token.should.not.be.null;
            //DECIDE ON A RANDOM OPINION, ['FOR', 'AGAINST','NEUTRAL']
            const opinion = faker.helpers.arrayElement(['for', 'against', 'neutral']);

            //USE TOKEN THE TOKEN AND RANDOM OPINION TO ADD ENDO TO RANDOM DEBATE
            const endorsementResponse = await request(app)
                .post('/debates/debate/'+testData.debate.id + '/endorsements')
                .set('token', token)
                .send({opinion})
                .expect(200);
            
            //WHEN CALL ADD DEBATE SHOULD GET 200
            // ALSO RETURNED VALUES SHOULD MATCH ENTERED ONES
            const endo = endorsementResponse.body[0];
            endo.user_id.should.equal(loginRespose.body.user.id);
            endo.debate_id.should.equal(testData.debate.id);
            endo.opinion.should.equal(opinion);
        });

        it('should not make endorsements if user is not logged in (token is missing)', async function(){           
            opinion = faker.helpers.arrayElement(['for' , 'against','neutral']);

            const endorsementResponse = await request(app)
                .post('/debates/debate/'+testData.debate.id + '/endorsements')
                .send({opinion})
                .expect(403);

            const endo = await knex.select('id').from('endorsemets');
            endo.length.should.equal(0);            


        });  
        it('should not create two endorsemenrs if user changed endorsements', async function(){
            const loginRespose = await request(app)
            .post('/users/login')
            .send({
                email: "rima1@gmail.com",
                password: '123456'
            })
            .expect(200); //send login api

            // TAKE JWT FROM LOGIN
            const token = loginRespose.body.token;

            //ENSURE THAT JWT EXISTS
            token.should.not.be.null;

            //DETERMINE TWO RANDOM EDNORSEMENTS
            const opinion1 = faker.helpers.arrayElements(['for', 'against', 'neutral']);
            const opinion2 = faker.helpers.arrayElements(['for', 'against', 'neutral']);

            //CREATE 1ST ENDO
            const endorsementResponse1 = await request(app)
                .post('/debates/debate/'+testData.debate.id + '/endorsements')
                .set('token', token)
                .send({opinion1})
                .expect(200);

            //CREATE 2ND ENDO
            const endorsementResponse2 = await request(app)
                .post('/debates/debate/'+testData.debate.id + '/endorsements')
                .set('token', token)
                .send({opinion2})
                .expect(200);
            
            
            //CHECK NO ENDOS IN THE DB
            const NoEndos = await knex.count('*').from('endorsemets');
            NoEndos[0].count.should.equal('1');
            
            
            //CHECK THE VALUE OF THE OPINION (SHOULD BE THE2ND ONE)
            const storedEndo = await knex.select('opinion').from('endorsemets').first();
            storedEndo[0].opinion.should.equal({opinion: opinion1});


        });




    })
})