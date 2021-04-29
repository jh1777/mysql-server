'use strict';
module.exports = function(app) {
  var api = require('../controllers/gehaltController');
  var ausgabenApi = require('../controllers/ausgabenController');
  var logApi = require('../controllers/logsController');
  var versicherungenApi = require('../controllers/versicherungenController');
  var buchungenApi = require('../controllers/buchungenController');
  var buchungskategorienApi = require('../controllers/buchungskategorienController');

  app.route('/api')
    .get(api.sql_test);

  // Logs
  app.route('/api/logs')
    .get(logApi.getAll)
    .post(logApi.createNew)

  // Buchungen
  app.route('/api/buchungen')
    .get(buchungenApi.getAll)
    .post(buchungenApi.createNew);

  app.route('/api/buchungen/:id')
    .delete(buchungenApi.delete);

  // Buchungskategorien
  app.route('/api/buchungen/config')
    .get(buchungskategorienApi.getAll)
    .post(buchungskategorienApi.createNew);

  app.route('/api/buchungen/config/:id')
    .delete(buchungskategorienApi.delete);

  // Ausgaben
  app.route('/api/ausgaben')
    .get(ausgabenApi.getAll)
    .post(ausgabenApi.createNew);

  app.route('/api/ausgaben/:id')
    .put(ausgabenApi.set);
  
  app.route('/api/ausgaben/:id')
    .delete(ausgabenApi.delete);

  // Versicherungen
  app.route('/api/versicherungen')
    .get(versicherungenApi.getAll)
    .post(versicherungenApi.createNew);
  
  app.route('/api/versicherungen/:id')
    .delete(versicherungenApi.delete);

  // Gehalt
  app.route('/api/gehalt/list/:data/:jahr')
    .get(api.listGehalt);

  app.route('/api/gehalt/:art')
  	.get(api.gehaltMonatJahr);

  app.route('/api/gehalt')
    .get(api.gehaltMonatJahr)
    .post(api.insertGehalt2);

  app.route('/api/gehalt/:jahr/:monat')
    .delete(api.deleteGehalt);
};
