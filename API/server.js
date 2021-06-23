const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./src/config/index');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'content-type');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');next();//Se ocorreu tudo certo aqui, passa pra próxima função (next funciona como um bit de trava para a função ser executada primeiro e evitar o callback)
});

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('testeBD') // coloque o nome do seu DB

    app.listen(3001, () => {
        console.log('Server running on port 3001')
    })
})

app.get('/', (req, res) => {
    var cursor = db.collection('manufacturer').find()
})

const manufacturerRouter = require('./src/routers/index');
app.use('/api', manufacturerRouter);

module.exports = app;