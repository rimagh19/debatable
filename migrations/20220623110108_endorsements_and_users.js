/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  //define the two tables (users, endorsements)
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema
        //table USERS (id, name, email. role, gender)
        .createTable('users',
        function(table){
            //ATT id 
            table.uuid('id').notNullable().primary()
            .defaultTo(knex.raw('uuid_generate_v1()'));
            //ATT name 
            table.string('name').notNullable();
            //ATT email 
            table.string('email').notNullable().unique();
            //ATT role (adin or user) (enu instead of enum (restricted))
            table.enu('role',['admin', 'user'],{useNative: true, enumName:'user_role'})
                .notNullable().defaultTo('user');
            //ATT gender (female or male) 
            table.enu('gender',['female', 'male'],{useNative: true, enumName:'user_gender'});
        })
        //table USERS (id, name, email. role, gender)
        .createTable('endorsemets',
        function(table){
            //ATT id
            table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v1()'));
            //ATT user_id - FK(user_id)=>PK(id)
            table.uuid('user_id').notNullable();
            table.foreign('user_id').references('id').inTable('users');
            //ATT debate_id
            table.uuid('debate_id').notNullable();
            table.foreign('debate_id').references('id').inTable('debates');
            //ATT opinion
            table.enu('opinion', ['for' ,'against', 'netural'], {useNative:true, enumName:'endorsement_opinion'});
            //ATT created_at
            table.timestamp('created_at').defaultTo(knex.fn.now());


            //UNIQUE constraint (one endorsement aloowed in every debate for every user)
            table.unique(['user_id', 'debate_id']);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
