'use strict';
Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

// https://www.sitepoint.com/using-node-mysql-javascript-client/
exports.sql_test = function(req, res) {
  connection.query('SELECT * FROM Gehalt', (err,rows) => {
	if(err) { res.status(404).send('Sorry, we cannot find that'); }//throw err;
	  //console.log(rows);
	  res.json({ message: "SELECT statement working - retreived "+ rows.length +" rows"});
	});

};

exports.gehaltMonatJahr = function(req, res) {
  // Get Jahr and Monat from URL parameters
		var param = req.params.art;

		var jahr = req.query.jahr;
		var monat = req.query.monat;

		if (param != null) {
			if (["AKP","Kantine","Brutto","Netto"].contains(param)) {
			connection.query(`SELECT Jahr, sum(${param}) as Summe FROM Gehalt group by Jahr`, (err,rows) => {
				if(err) { res.status(404).send('Sorry, we cannot find that'); }//throw err;

				//console.log(rows);
				if (rows.length > 0) {
					res.json(rows); 
				}
			});
			} else { res.status(404).send('Sorry, we cannot find that!'); }
		}
		if (monat == null && jahr != null) {
			connection.query(`SELECT Jahr, sum(Brutto) as Brutto_Summe, sum(Netto) as Netto_Summe, round(avg(Brutto),2) as Brutto_Avg, round(avg(Netto),2) as Netto_Avg, round(sum(Kantine), 2) as Kantine, round(sum(AKP),2) as AKP FROM Gehalt where Jahr = ${jahr}`, (err,rows) => {
				if(err) { res.status(404).send('Sorry, we cannot find that'); }//throw err;

				//console.log(rows);
				if (rows.length > 0) {
					res.json(rows[0]); 
				}
			});
		} 
		if (jahr == null && monat != null) {
			connection.query(`SELECT Monat, round(avg(Brutto),2) as Brutto_Avg, round(avg(Netto),2) as Netto_Avg FROM Gehalt where Monat = ${monat}`, (err,rows) => {
				if(err) { res.status(404).send('Sorry, we cannot find that'); }//throw err;

				if (rows.length > 0) {
					res.json(rows[0]); 
				}
			});
		}
		if (monat != null && jahr != null) {
			connection.query(`SELECT * FROM Gehalt where Monat = ${monat} and Jahr = ${jahr}`, (err,rows) => {
				if(err) { res.status(404).send('Sorry, we cannot find that'); }//throw err;

				if (rows.length > 0) {
					res.json(rows[0]); 
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
		if(err) { res.status(404).send('Sorry, we cannot find that'); }//throw err;
	  console.log('Last insert ID:', result.insertId);
		res.json(gehaltRow);
	});
};

exports.deleteGehalt = function (req, res) {
	var jahr = req.get('Jahr');
	var monat = req.get('Monat');
	const gehaltRow = { Monat: monat, Jahr: jahr };

	connection.query('DELETE FROM Gehalt Where Monat = ? and Jahr = ?', [monat, jahr], (err, result) => {	
		if(err) { res.status(404).send('Sorry, we cannot find that'); }//throw err;
		res.json(gehaltRow);
	});
};
