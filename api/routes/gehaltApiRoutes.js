'use strict';
module.exports = function(app) {
  var api = require('../controllers/gehaltController');

  app.route('/sql')
    .get(api.sql_test);

  app.route('/sql/gehalt')
  	.get(api.gehaltMonatJahr);

  app.route('/sql/gehalt')
    .post(api.insertGehalt);
<<<<<<< HEAD
  
  app.route('/sql/gehalt')
    .delete(api.deleteGehalt);
};
=======
    
};
>>>>>>> 0613cb74a8209efc386fff8e175ee16e4d56698f
