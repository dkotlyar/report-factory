#!/bin/bash

mvn clean package
docker build -f src/main/docker/Dockerfile -t dkotlyar/report-factory-jvm .
