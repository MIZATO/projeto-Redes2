const express = require('express');
const path = require('path');
const { Socket } = require('socket.io');
//informando a porta para ser processada
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//chama o index.html
app.use('/',(req,res)=> {
    res.render('index.html');
});
// armazena as mensagens
let messages = [];
//conecta para o novo cliente
io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });

});

server.listen(3000);
