var express = require('express'),
  app = express(),
  cors = require('cors'),
  port = process.env.PORT || 4100,
  bodyParser = require('body-parser');


const mysql = require('mysql');
global.connection = mysql.createConnection({
  host: '192.168.178.129',
  user: 'joerg',
  password: 'j740lba',
  database: 'jh'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to mysql db "jh" on Zotac ZBox!');
});

/*
// https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
// http://docs.sequelizejs.com/manual/installation/getting-started
const Sequelize = require('sequelize');
// Or you can simply use a connection uri
const sequelize = new Sequelize('mysql://ohremote:j740lba@openhabianpi:3306/jh' );

const Gehalt = sequelize.define('Gehalt', {
  Jahr: {
    type: Sequelize.INTEGER
  },
  Monat: {
    type: Sequelize.INTEGER
  },
  Brutto: {
    type: Sequelize.DECIMAL(9,2)
  },
  Netto: {
    type: Sequelize.DECIMAL(9,2)
  },
  Kantine: {
    type: Sequelize.DECIMAL(9,2)
  },
  AKP: {
    type: Sequelize.DECIMAL(9,2)
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    Gehalt.findOne().then(gehalt => {
  		console.log(gehalt.get('Monat'));
	});
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cors')());

app.options('/api/gehalt', cors());
app.options('/api/ausgaben', cors());
app.options('/api/absicherung', cors());
app.options('/api/logs', cors());
app.options('/api/versicherungen', cors());
app.options('/api/buchungen', cors());

/* const cors = require('cors')
app.get('/with-cors', cors(), (req, res, next) => {
  res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' })
})
 */
var routes = require('./api/routes/gehaltApiRoutes'); //importing route
routes(app); //register the route

const host = '0.0.0.0';
app.listen(port, host);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found ...'})
});
console.log('MySQL Gehalt RESTful API server started on: ' + port);

//TODO: https://www.sitepoint.com/using-node-mysql-javascript-client/
