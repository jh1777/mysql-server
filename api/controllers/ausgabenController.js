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
        if (err) { res.status(500).send(`Error creating new entry: ${JSON.stringify(err)}`); }
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

exports.set = function (req, res) {
	var id = req.params.id;
    let statements = [];

    if (req.body.Betrag) statements.push(`Betrag = ${req.body.Betrag}`);
    if (req.body.Ende) statements.push(`Ende = '${req.body.Ende}'`);
    if (req.body.Start) statements.push(`Start = '${req.body.Start}'`);
    if (req.body.Bearbeitet) statements.push(`Bearbeitet = '${req.body.Bearbeitet}'`);
    if (req.body.Kategorie) statements.push(`Kategorie = '${req.body.Kategorie}'`);
    if (req.body.Intervall) statements.push(`Intervall = '${req.body.Intervall}'`);
    if (req.body.Beschreibung) statements.push(`Beschreibung = '${req.body.Beschreibung}'`);
    if (req.body.Name) statements.push(`Name = '${req.body.Name}'`);

    if (statements.length > 0) {

        connection.query(`UPDATE Ausgaben set ${statements.join(',')} where Ausgaben.id = ${id}`, (err, result) => {
            if (err) { res.status(500).send(`There was a problem setting ${id}: ${statements.join(',')}, Error ${JSON.stringify(err)}`); }
            res.status(201).send(result);
        });
    }
};
