'use strict';
var utils = require('../../util/stringHelper');

Array.prototype.contains = function (element) {
    return this.indexOf(element) > -1;
};

exports.getAll = function (req, res) {
    connection.query(`SELECT * FROM Absicherung`, (err, rows) => {
        if (err) { res.status(500).send(`Sorry, we cannot find that: ${JSON.stringify(err)}`); }
        res.json(rows);
    });
};

exports.createNew = function (req, res) {
    connection.query('INSERT INTO Absicherung SET ?', req.body, (err, result) => {
        if (err) { res.status(500).send(`Error creating new entry: ${JSON.stringify(err)}`); }
        res.status(201).send(result);
    });
};

exports.delete = function (req, res) {
	var id = req.params.id;
	connection.query('DELETE FROM Absicherung Where id = ?', [id], (err, result) => {	
		if(err) { res.status(500).send(`Deletion failed: ${JSON.stringify(err)}`); }
		res.status(200).send(result);
	});
};

exports.set = function (req, res) {
	var id = req.params.id;
    let statements = [];

    if (req.body.Person) statements.push(`Person = ${req.body.Person}`);
    if (req.body.Name) statements.push(`Name = '${req.body.Name}'`);
    if (req.body.Art) statements.push(`Art = '${req.body.Art}'`);
    if (req.body.Versicherung) statements.push(`Versicherung = '${req.body.Versicherung}'`);
    if (req.body.Versicherungsnummer) statements.push(`Versicherungsnummer = '${req.body.Versicherungsnummer}'`);
    if (req.body.Monatsbetrag) statements.push(`Monatsbetrag = '${req.body.Monatsbetrag}'`);
    if (req.body.Einmalzahlung) statements.push(`Einmalzahlung = '${req.body.Einmalzahlung}'`);
    if (req.body.Faelligkeit) statements.push(`Faelligkeit = '${req.body.Faelligkeit}'`);
    if (req.body.Kommentar) statements.push(`Kommentar = '${req.body.Kommentar}'`);
    if (req.body.Bearbeitet) statements.push(`Bearbeitet = '${req.body.Bearbeitet}'`);

    if (statements.length > 0) {

        connection.query(`UPDATE Absicherung set ${statements.join(',')} where Absicherung.id = ${id}`, (err, result) => {
            if (err) { res.status(500).send(`There was a problem setting ${id}: ${statements.join(',')}, Error ${JSON.stringify(err)}`); }
            res.status(201).send(result);
        });
    }
};
