#!/bin/bash
docker image build -t webapp-api ./api
docker image build -t webapp-client ./client
docker-compose up --build