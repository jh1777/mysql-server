'use strict';
module.exports = function(app) {
  var api = require('../controllers/gehaltController');

  app.route('/api')
    .get(api.sql_test);


  app.route('/api/list')
    .post(api.listGehalt);

  app.route('/api/gehalt/:art')
  	.get(api.gehaltMonatJahr);

  app.route('/api/gehalt')
    .get(api.gehaltMonatJahr)
    .post(api.insertGehalt2)
    .delete(api.deleteGehalt); 
};
