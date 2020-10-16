require('dotenv').config();

const {
  ALARMS_TABLE
} = process.env;


exports.up = function(knex) {
  return knex.schema.createTable(ALARMS_TABLE, function(t) {
    t.string('id').primary();
    t.enu('log_type', ['start', 'stop']).notNullable();
    t.string('timestamp').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(ALARMS_TABLE);
};
