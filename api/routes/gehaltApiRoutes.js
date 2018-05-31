'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/gehaltController');

  app.route('/sql')
    .get(todoList.sql_test);

  app.route('/sql/gehalt')
  	.get(todoList.gehaltMonatJahr);

};
