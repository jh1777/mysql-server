'use strict';
module.exports = function(app) {
  var api = require('../controllers/gehaltController');

  app.route('/sql')
    .get(api.sql_test);

  app.route('/sql/gehalt/:art')
  	.get(api.gehaltMonatJahr);

  app.route('/sql/gehalt')
    .get(api.gehaltMonatJahr)
    .post(api.insertGehalt)
    .delete(api.deleteGehalt); 
};
