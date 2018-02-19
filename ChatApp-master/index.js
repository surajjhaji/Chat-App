const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is listening on Port : ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html');
});
app.get('/swift', (req, res) => {
    res.sendFile(__dirname + '/public/swift.html');
});
app.get('/html', (req, res) => {
    res.sendFile(__dirname + '/public/html.html');
});




// Creating a Tect Name Space

const tech = io.of('/tech');



tech.on('connection', (socket) => {

    socket.on('join', (data) =>{
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user joined ${data.room} room!`);
    });

    console.log('User Connected');
    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`);
        tech.in(data.room).emit('message', data.msg);
    });

   io.on('disconnect', () =>{
        console.log('User Disconnected');

        tech.emit('message', 'user disconnected');
    })
});

