require('app-module-path').addPath(require('app-root-path').toString());
require('dotenv').config();

const {
  ALARMS_TABLE,
} = process.env;

const {uuid} = require('uuidv4');

const TAG = '[AlarmService]';

/**
 * @module AlarmService
 */
class AlarmService {
  /**
   * @constructor
   */
  constructor({AlarmRepository}) {
    this._alarmRepository = AlarmRepository;
  }

  /**
   * get all alarms in db
   */
  async getAllAlarms() {
    const METHOD = '[getAllAlarms]';
    console.log(`${TAG} ${METHOD}`);
    // get all alarms
    const alarms = await this._alarmRepository.getAll();
    return alarms;
  }

  /**
   * create new alarm
   * @param {date} timestamp - time of alarm
   * @param {string} log_type - type of log
   */
  async createAlarm(timestamp, log_type) {
    const METHOD = '[createAlarm]';
    console.log(`${TAG} ${METHOD}`);
    if (!this._verifyLogType(log_type)) {
      return {
        "success": false,
        "message": "log type should be stop or start only"
      };
    }
    const id = uuid();
    // compose data to be added
    const data = {
      id,
      timestamp,
      log_type,
    };
    try {
      const alarm = await this._alarmRepository.insert(data);
      return {
        "success": true,
        "message": "created",
        id
      };
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * create new alarm
   * @param {string} id - id of alarm
   */
  async deleteAlarm(id) {
    const METHOD = '[deleteAlarm]';
    console.log(`${TAG} ${METHOD}`);
    if (await this._verifyAlarm(id)) {
      try {
        const alarm = await this._alarmRepository.delete({id});
        return {
          success: true,
          message: "deleted"
        };
      } catch (e) {
        console.log(e);
      }
    } else {
      return {
        success: false,
        message: "no account with that id"
      };
    }
  }
  
  _verifyLogType(log_type) {
    return log_type && (log_type === 'start' ||  log_type === 'stop');
  }

  async _verifyAlarm(id) {
    try {
      const alarm = await this._alarmRepository.findWithCondition({id});
      if (alarm.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }


}

module.exports = AlarmService;
