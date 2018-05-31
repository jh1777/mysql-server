'use strict';
// https://www.sitepoint.com/using-node-mysql-javascript-client/
exports.sql_test = function(req, res) {
  connection.query('SELECT * FROM Gehalt', (err,rows) => {
	  if(err) throw err;
	  //console.log(rows);
	  res.json({ message: "SELECT statement working - retreived "+ rows.length +" rows"});
	});

};

exports.gehaltMonatJahr = function(req, res) {
  // Get Jahr and Monat from URL parameters
	  var jahr = req.query.jahr;
	  var monat = req.query.monat
	  connection.query(`SELECT * FROM Gehalt where Monat = ${monat} and Jahr = ${jahr}`, (err,rows) => {
	  if(err) throw err;

	  //console.log(rows);
	  if (rows.length > 0) {
	    res.json(rows[0]); //.Brutto);
	  }
	});
};
