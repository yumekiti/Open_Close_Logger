const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 80;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/' , function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', async function(req, res){
  await prisma.status.create({
    data: {
      body: req.body?.status ? true : false,
    },
  })

  const status = await prisma.status.findMany()
  io.emit('event', status);
})

io.on('connection', async function(socket){
  const status = await prisma.status.findMany()
  socket.emit('event', status);

  socket.on('event', function(status){
    io.emit('event', status);
  });
});

http.listen(PORT, function(){
  console.log('server listening. Port:' + PORT);
});