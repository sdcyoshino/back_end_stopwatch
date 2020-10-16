const knex = require('knex')(require('knexfile'));

const {
  ALARMS_TABLE
} = process.env;

const TAG = '[AlarmRepository]';
/**
 * @module AlarmRepository
 */
class AlarmRepository {
  /**
   * @constructor
   */
  constructor() {
    // super(ALARMS_TABLE);
  }

  /**
   * get all alarms
   */
  async getAll() {
    let result;
    try {
      result = await knex(ALARMS_TABLE)
          .select();
    } catch (DBError) {
      throw new Error(DBError);
    }
    return result;
  }

  /**
   * inserts data
   * @param {object} data
   */
  async insert(data) {
    try {
      return await knex(ALARMS_TABLE)
          .insert(data);
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }

  /**
   * delete data
   * @param {object} where
   */
  async delete(where) {
    try {
      return await knex(ALARMS_TABLE)
          .where(where)
          .del()
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }

  /**
   * find with conditions
   * @param {object} where
   */
  async findWithCondition(where) {
    try {
      return await knex(ALARMS_TABLE)
          .select()
          .where(where);
    } catch (SQLError) {
      throw new Error(SQLError);
    }
  }
}

module.exports = AlarmRepository;
