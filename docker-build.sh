#!/bin/bash

# BUILD
docker build . -t jh/nodejs-mysql-api 

# RUN
docker run -p 49160:4100 -d jh/nodejs-mysql-api
