'use strict';
var utils = require('../../util/stringHelper');

Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

// https://www.sitepoint.com/using-node-mysql-javascript-client/
exports.sql_test = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  connection.query('SELECT * FROM Gehalt', (err,rows) => {
	if(err) { res.status(500).send(`Sorry, we cannot find that: ${JSON.stringify(err)}`); }
	  //console.log(rows);
	  res.json({ message: "SELECT statement working - retreived "+ rows.length +" rows"});
	});

};

exports.gehaltMonatJahr = function(req, res) {
  // Get Jahr and Monat from URL parameters
	var param = req.params.art;
	console.log('gehaltMonatJahr entered...');
	var jahr = req.query.jahr;
	var monat = req.query.monat;
	res.setHeader('Access-Control-Allow-Origin', '*');

	if (param != null) {
		if (["AKP","Kantine","Brutto","Netto"].contains(param)) {
			var queryString = `SELECT Jahr, sum(${param}) as Summe FROM Gehalt group by Jahr`;
			if (jahr!= null) {
				queryString = `SELECT Jahr, Monat, ${param} FROM Gehalt WHERE Jahr = ${jahr}`;
			}
			connection.query(queryString, (err,rows) => {
				if(err) { res.status(500).send(`Sorry, we cannot find that: ${JSON.stringify(err)}`); }

				
				if (rows.length > 0) {
					res.json(rows); 
				}
			});
		} else { 
			res.status(404).send('Sorry, only AKP, Kantine, Brutto and Netto are valid');
		}
	} else {
		if (monat == null && jahr != null) {
			connection.query(`SELECT Jahr, sum(Brutto) as Brutto_Summe, sum(Netto) as Netto_Summe, round(avg(Brutto),2) as Brutto_Avg, round(avg(Netto),2) as Netto_Avg, round(sum(Kantine), 2) as Kantine, round(sum(AKP),2) as AKP FROM Gehalt where Jahr = ${jahr}`, (err,rows) => {
				if(err) { res.status(500).send(`Sorry, we cannot find that: ${JSON.stringify(err)}`); }

				//console.log(rows);
				if (rows.length > 0) {
					res.json(rows[0]); 
				}
			});
		} 
		if (jahr == null && monat != null) {
			connection.query(`SELECT Monat, round(avg(Brutto),2) as Brutto_Avg, round(avg(Netto),2) as Netto_Avg FROM Gehalt where Monat = ${monat}`, (err,rows) => {
				if(err) { res.status(500).send(`Sorry, we cannot find that: ${JSON.stringify(err)}`); }

				if (rows.length > 0) {
					res.json(rows[0]); 
				}
			});
		}
		if (monat != null && jahr != null) {
			connection.query(`SELECT * FROM Gehalt where Monat = ${monat} and Jahr = ${jahr}`, (err,rows) => {
				if(err) { res.status(500).send(`Sorry, we cannot find that: ${JSON.stringify(err)}`); }

				if (rows.length > 0) {
					res.json(rows[0]); 
				}
			});
		}
		if (monat == null && jahr == null) {
			connection.query(`SELECT * FROM Gehalt`, (err,rows) => {
				if(err) { res.status(500).send(`Sorry, we cannot find that: ${JSON.stringify(err)}`); }
				res.json(rows);
				//if (rows.length > 0) {
				//	res.json(rows[0]); 
				//}
			});
		}
	}
};

exports.insertGehalt2 = function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	// maybe check for json params
	connection.query('INSERT INTO Gehalt SET ?', req.body, (err, result) => {	
		if(err) { res.status(404).send('There was a problem', JSON.stringify(err)); }//throw err;
	  console.log('Last insert ID:', result.insertId);
	  	res.status(201).send(result);
	});
};

exports.listGehalt = function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var jahr = req.params.jahr;
	var data = req.params.data;
	//const result =  { Jahr: j };

	connection.query('SELECT * FROM Gehalt WHERE Jahr = ?', [jahr], (err,rows) => {
		if(err) { res.status(500).send(`Sorry, we cannot find that: ${JSON.stringify(err)}`); }
		
		// console.log(rows);
		if (rows.length > 0) {
			if(rows[0].hasOwnProperty(data)) {
				var json = { List: [ ] };
				rows.forEach(row => {
					var t = `${row.Jahr}/${utils.appendZero(row.Monat)}`;
					var entry = `{ "Monat": "${t}", "Value": ${row[data]}, "Data": "${data}" }`;
					json['List'].push(JSON.parse(entry));
				});
				res.json(json);	
			} else {
				res.status(400).send(`Column not found in data: ${data}`); 
			}
		}
	});
};

exports.deleteGehalt = function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE");
	var jahr = req.params.jahr;
	var monat = req.params.monat;

	connection.query('DELETE FROM Gehalt Where Monat = ? and Jahr = ?', [monat, jahr], (err, result) => {	
		if(err) { res.status(500).send(`Deletion failed: ${JSON.stringify(err)}`); }
		res.status(200).send(result);
	});
};
