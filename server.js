require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const db_pass = process.env.DB_PASSWORD;
const db_username = process.env.DB_USERNAME;
const url_mongodb = `mongodb+srv://${db_username}:${db_pass}@chatrealtime.4rv3gsr.mongodb.net/`;
const port = 3000;
const io = new Server(server);




app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

mongoose.connect(url_mongodb).then( () => console.log("Mongo se ha conectado"));

const Mensaje = mongoose.model('Mensaje', {nombre: String, mensaje: String});

io.on('connection', () => {
  console.log("Un usuario esta conectado");
});

app.get('/mensajes', (req, res) => {
  Mensaje.find({}).then((mensajes) => {
    res.send(mensajes);
  })
})

app.post('/mensajes', (req, res) => {
  let mensaje = new Mensaje(req.body);
  mensaje.save().then(() =>{
    io.emit('mensaje', req.body);
    return res.sendStatus(200);
  })
})

server.listen(port, () => {
  console.log(`Ejecutando en el puerto ${port}`);
})