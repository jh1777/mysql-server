# Gehalt MySQL API
Gets data from a mysql database running locally.

Sources:
+ [Build Node.js RESTful APIs in 10 Minutes](https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd)
+ [Using MySQL with Node.js and the mysql JavaScript Client](https://www.sitepoint.com/using-node-mysql-javascript-client/)

## Start
In project directory:
`npm run start` or  `pm2 start server.js` 

## Start as service
**Start:**: `sudo /etc/init.d/mysql-api start`
**Stop:**: `sudo /etc/init.d/mysql-api stop`  
(File used as service in init.d is included in Git Repo root folder)

## Usage
API Example to get Monat 1 form Jahr 2018:
`http://localhost:4000/api/gehalt?jahr=2018&monat=1`