#!/bin/bash

mvn clean package
docker build -f src/main/docker/Dockerfile -t nexus.vsplatforma.ru/report-factory-jvm .
