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
		var monat = req.query.monat;
		if (monat == null) {
			connection.query(`SELECT Jahr, sum(Brutto) as Brutto_Summe, sum(Netto) as Netto_Summe, round(avg(Brutto),2) as Brutto_Avg, round(avg(Netto),2) as Netto_Avg FROM Gehalt where Jahr = ${jahr}`, (err,rows) => {
				if(err) throw err;

				//console.log(rows);
				if (rows.length > 0) {
					res.json(rows[0]); //.Brutto);
				}
			});
		} else {
			connection.query(`SELECT * FROM Gehalt where Monat = ${monat} and Jahr = ${jahr}`, (err,rows) => {
				if(err) throw err;

				//console.log(rows);
				if (rows.length > 0) {
					res.json(rows[0]); //.Brutto);
				}
			});
		}
};


exports.insertGehalt = function (req, res) {
	var jahr = req.get('Jahr');
	var monat = req.get('Monat');
	var brutto = req.get('Brutto');
	var netto = req.get('Netto');
	var akp = req.get('AKP');
	var kantine = req.get('Kantine');
	const gehaltRow = { Monat: monat, Jahr: jahr, Brutto: brutto, Netto: netto, AKP: akp, Kantine: kantine };
	console.log(gehaltRow);
	connection.query('INSERT INTO Gehalt SET ?', gehaltRow, (err, result) => {	
		if(err) throw err;
	  console.log('Last insert ID:', result.insertId);
		res.json(gehaltRow);
	});
};

exports.deleteGehalt = function (req, res) {
	var jahr = req.get('Jahr');
	var monat = req.get('Monat');
	const gehaltRow = { Monat: monat, Jahr: jahr };

	connection.query('DELETE FROM Gehalt Where Monat = ? and Jahr = ?', [monat, jahr], (err, result) => {	
		if(err) throw err;
		res.json(gehaltRow);
	});
};
