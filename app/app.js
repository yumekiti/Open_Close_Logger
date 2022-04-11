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
      body: false,
    },
  })
  
  const status = await prisma.status.findMany()
  io.emit('message', status.body);
})

io.on('connection',function(socket){
  socket.on('message',function(msg){
    io.emit('message', msg);
  });
});

http.listen(PORT, function(){
  console.log('server listening. Port:' + PORT);
});