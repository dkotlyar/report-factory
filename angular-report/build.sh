#!/bin/bash

ng build --prod
docker build -f ./docker/Dockerfile -t dkotlyar/angular-report-example .
