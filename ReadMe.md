# Flight-CRM

- Final project fullstack developer 2021

- Asmaa Abugama [part I: server side]

  - Using Express.js server on node to create web server with secure http protocol.
    - (https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/)
  - Using postgresql db for store data on server side:

    - local db server: include dumpfile (on 'data/test_db.sql')

  - Using mongodb - Atlas for transaction logs.

    - mongodb+srv://eli:Lvvf3gzFdKn8KuC@int2021.xduzl.mongodb.net/node-auth.

  - Testing DEO modules with Mocha and chai (\*\_test.js files on the root folder).

    - All the tests files delete and generate demo data on all tables db before running them.
    - For Testing Search flight view the project generate flights data up to 24 hours when the server upload!

  - Testing Rest-Api with postman and newman (on test folder - Regression\_\*\_rest_api.postman.collection.json files).

  - Using swagger for rest api documantaion on:

  - Using Winston logger for create log messages (save to file: folder log/logFlight1.log).
