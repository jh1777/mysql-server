'use strict';
module.exports = function(app) {
  var api = require('../controllers/gehaltController');

  app.route('/sql')
    .get(api.sql_test);

  app.route('/sql/gehalt/:art')
  	.get(api.gehaltMonatJahr);

  app.route('/sql/gehalt')
    .post(api.insertGehalt);
  
  app.route('/sql/gehalt')
    .delete(api.deleteGehalt);
};
