require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// AWilix
const {createContainer} = require('awilix');
// Loaders
const initializeLoaders = require('./loaders');

const {
  PORT
} = process.env;

const container = createContainer();
initializeLoaders(container);

app.use((req, res, next) => {
  req.container = container;
  next();
});
app.use(express.json());
// CORS
app.use(cors({
  'allowedHeaders': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
}));

app.get('/api/logs', async (req, res) => {
  const { AlarmService } = req.container.cradle;
  const alarms = await AlarmService.getAllAlarms();
  res.status(200).send(alarms);
});

app.post('/api/logs', async (req, res) => {
  const { AlarmService } = req.container.cradle;
  const { timestamp, log_type } = req.body;
  const alarm = await AlarmService.createAlarm(timestamp, log_type);
  if (alarm.success) {
    res.status(201).send(alarm);
  } else {
    res.status(500).send(alarm);
  }
});

app.delete('/api/logs/:id', async (req, res) => {
  const { AlarmService } = req.container.cradle;
  const {id} = req.params;
  const deleteAlarm = await AlarmService.deleteAlarm(id);
  if (deleteAlarm.success) {
    res.status(201).send(deleteAlarm);
  } else {
    res.status(500).send(deleteAlarm);
  }
});

app.listen(PORT, () => console.log(`listening to port ${PORT}...`));