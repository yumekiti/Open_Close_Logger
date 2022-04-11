const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 80;
const prisma = new PrismaClient()

app.get('/' , function(req, res){
  res.sendFile(__dirname+'/index.html');
});

app.post('/', async function(req, res){
  await prisma.status.create({
    data: {
      body: true,
    },
  })

  const status = await prisma.status.findMany()
  io.emit('event', status.slice(-1)[0].body);
})

io.on('connection', function(socket){
  socket.on('event', function(status){
    io.emit('event', status);
  });
});

http.listen(PORT, function(){
  console.log('server listening. Port:' + PORT);
});