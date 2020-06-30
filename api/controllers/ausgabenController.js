'use strict';
var utils = require('../../util/stringHelper');

Array.prototype.contains = function (element) {
    return this.indexOf(element) > -1;
};

exports.getAll = function (req, res) {
    connection.query(`SELECT * FROM Ausgaben a where a.Ende is null or a.Ende > current_date`, (err, rows) => {
        if (err) { res.status(500).send(`Sorry, we cannot find that: ${JSON.stringify(err)}`); }
        res.json(rows);
    });
};

exports.createNew = function (req, res) {
    connection.query('INSERT INTO Ausgaben SET ?', req.body, (err, result) => {
        if (err) { res.status(404).send('There was a problem', JSON.stringify(err)); }
        console.log('Last insert ID:', result.insertId);
        res.status(201).send(result);
    });
};

exports.delete = function (req, res) {
	var id = req.params.id;
	connection.query('DELETE FROM Ausgaben Where id = ?', [id], (err, result) => {	
		if(err) { res.status(500).send(`Deletion failed: ${JSON.stringify(err)}`); }
		res.status(200).send(result);
	});
};