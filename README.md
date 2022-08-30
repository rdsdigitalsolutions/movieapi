# Super Simple Movie API.
A simple API in Express JS + JWT + Mongodb + RabitMq + Docker.

The idea here is to create a protected API that allow to CRUD a specific resource and for some actions insert a message in a queue so a consumer can pull it, parse, and email/notify someone, all using nodejs, mongodb and docker.

## Instructions:
- Rename `.env.sample` to `.env` and check if values are ok.
- Build the docker containers from project root: `docker-compose up --build --force-recreate --renew-anon-volumes -d`

## Check DB etries:
http://localhost:7501/db/test/movies

## Check Queue entries:
http://localhost:15672/#/queues/%2F/movies

## Check Consumer works:
Just access the `consumer` container and check the logs to see the output messages.

> That will only send emails if .env is updated with the correct AWS credentials and "email" function is not commented.

## [Tests] Postman Collection for reference and tests.
Use the provided collection to test end-to-end all CRUD endpoints for this API.

## Observations:

Intentionally not using the following to speed up development:
- Typescript;
- Specific data validation/parsing/manipulation.
- https/certificates in the docker images.
- Classes and advanced design patterns.
- AWS connections (keeping everything testable on localhost via docker).
- Remote resources (DB/APIs/ETC).
- Openapi Documentation.
