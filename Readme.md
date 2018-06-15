# Gehalt MySQL API
Gets data from Raspberry's MariaDB (mysql) database "jh" table "Gehalt".

Sources:
+ [Build Node.js RESTful APIs in 10 Minutes](https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd)
+ [Using MySQL with Node.js and the mysql JavaScript Client](https://www.sitepoint.com/using-node-mysql-javascript-client/)

## Location
Developed in Synology NAS Docker image centos1. 
Directory: `home/app/nodejs-mysql-api`.

## Start
In project directory:
`npm run start` or  pm2 start server.js 

## Start as service
**Start:**: `sudo /etc/init.d/mysql-api start`
**Stop:**: `sudo /etc/init.d/mysql-api stop`  
(File used as service in init.d is included in Git Repo root folder)

[Example tutorial used](https://maker-tutorials.com/node-js-init-script-neustart-reboot-automatisch-starten-linux-raspberry-pi/)

## Usage
Example to get Monat 1 form Jahr 2018 (on docker centos1):
`http://jhnas.local:4000/sql/gehalt?jahr=2018&monat=1`


## Pi3
Run on Pi3 `/home/openhabian/nodejs-mysql-api`. Managed by PM2 (http://pm2.keymetrics.io/)  
Installed via `npm install pm2 -g`.  
Run app using `pm2 start server.js`.  
Autostart app via `pm2 save` and `pm2 startup systemd`.  
Comment displays correct command to be executed.

# Next Todos: 
## Try with another tutorial and postgres
[Getting Started with Node, Express and Postgres Using Sequelize](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize)


