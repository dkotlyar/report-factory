#!/bin/bash

ng build --prod
docker build -f ./docker/Dockerfile -t vsplatforma.ru/angular-report-example .
