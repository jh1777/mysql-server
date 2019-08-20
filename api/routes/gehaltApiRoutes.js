'use strict';
module.exports = function(app) {
  var api = require('../controllers/gehaltController');
  var ausgabenApi = require('../controllers/ausgabenController');

  app.route('/api')
    .get(api.sql_test);

  app.route('/api/ausgaben')
    .get(ausgabenApi.getAll)
    .post(ausgabenApi.createNew);

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
