// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const keys = require('./keys');
const app = express();
app.use(cors());
app.use(bodyParser.json());
console.log(keys);

const port = 5000;

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort
});

const { Pool } = require('pg');

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
})


pgClient
  .on('error', () => console.log('Cannot connect to PG database.'));
pgClient
  .query('CREATE TABLE IF NOT EXISTS sumyC (suma BIGINT);')
  .catch(err => console.log(err));


app.get('/suma/:a1/:q/:n', (request, response) => {
  let a1 = parseInt(request.params.a1);
  let q = parseInt(request.params.q);
  let n = parseInt(request.params.n);
  const key = `${a1}-${q}-${n}`;

  redisClient.get(key, (err, sum) => {
    let result = {};
    if (!sum) {
      let sumaCiagu;
        if (q==1) {
            sumaCiagu = a1 * n;
        }
        else {
            sumaCiagu = a1 * (1-Math.pow(q, n))/(1-q);
        }
      redisClient.set(key, sumaCiagu);
      pgClient
        .query('INSERT INTO sumyC (suma) VALUES ($1);', [sumaCiagu])
        .catch(error => console.log(`${error}`));
      result.sumaCiagu = sumaCiagu;
    }
    else {
      result.sumaCiagu = sum;
    }
    response.send(result);
  });
});


app.get('/results', (request, response) => {
  pgClient.query('SELECT * FROM sumyC;', (error, result) => {
    if (!result.rows || !result) {
      response.json([]);
    } else {
      response.json(result.rows);
    }
  });
});

app.listen(port, err => {
  console.log(`Backend app listening on ${port}`);
})