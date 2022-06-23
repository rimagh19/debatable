/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//-------------------------------------------------------------------------------------------
    /**
     * knex.schema.createTable(table_name, function(table){ ATT #1; ATT #2; ATT #3; ATT #4});
     */
//-------------------------------------------------------------------------------------------


//define the DB
exports.up = async function (knex) {
    //new extention that generats unique ids
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    //edit schema
    return knex.schema
    //table DEBATES(id, title, description, created_at)
    .createTable('debates',
        function(table){
            //ATT id 
            table.uuid('id').primary().notNullable()
            .defaultTo(knex.raw('uuid_generate_v1()'));
            //ATT title
            table.string('title').notNullable().unique();
            //ATT description
            table.string('descripttion');
            //ATT created_at
            table.timestamp('created_at').defaultTo(knex.fn.now());
        }
    );
};
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
exports.down = function (knex) {


};