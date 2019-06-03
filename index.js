var express = require("express");
var app = express();
const multer = require('multer');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
var path = require('path');
var routes = require('./server/routes/route');
app.use('/', routes);

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(express.static(path.join(__dirname + '/public')));
var server = app.listen(3000, function(err){
    console.log('listening 3000');
});
 var socket = require('socket.io')
var io = socket(server);
io.on('connection', function(socket){
     var data = "Socket connect"
    console.log('a user conneted');
    io.sockets.emit('connected', {message: '1 user connect'}) 
    // on user disconnect
    socket.on('disconnect', function(){
        console.log('user disconnect');
        io.sockets.emit('disconnect', {message: '1 user disconnect'})
    })
    // on chat mesage
    socket.on('chat', function(data){
      io.sockets.emit('chat', data) 
    });
    socket.on('name', function(data){
        io.sockets.emit('chat', {
            message:`my name is kamal <br> <br>
            <button class="btn btn-default wt-contact">About Contact</button> 
            <button class="btn btn-default wt-age">About Age</button><br>
            <img src="./images/2.jpg" width="400px;" style="margin-top: 4px;"/>`,
         name:'BOT1'}) 
      });
      socket.on('age', function(data){
        io.sockets.emit('chat', {
            message: `i am 22 yrs old <br> <br>
            <button class="btn btn-default wt-name">About Name</button> 
            <button class="btn btn-default wt-age">About Contact</button><br>
            <img src="./images/3.jpg" width="400px;" style="margin-top: 4px;"/>`,
         name:'BOT2'}) 
      });
      socket.on('contact', function(data){
        io.sockets.emit('chat', {
            message: `my contact is <a href="">9869063259</a> <br> <br>
            <button class="btn btn-default wt-name">About Name</button> 
            <button class="btn btn-default wt-age">About Age</button><br>
            <img src="./images/1.jpg" width="400px;" style="margin-top: 4px;"/>
            `,
             name:'BOT3'}) 
      });
})