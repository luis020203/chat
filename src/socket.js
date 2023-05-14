module.exports = (io) => {

    let nicknames = [];

    io.on('connection', socket => {
        console.log('usuario conectado');

        ///RECOGEMOS LOS DATOS DEL MENSAJE AL MOMENTO DE ENVIAR
        socket.on('enviar mensaje', (datos) =>{
                    //console.log(datos);
                    io.sockets.emit('nuevo mensaje', {
                        msg:datos,
                        username:socket.nickname
                    });
                });

                socket.on('nuevo usuario', (datos, callback) =>{
                    if(nicknames.indexOf(datos) != -1){
                        callback(false);
 
                    }else{
                        callback(true);
                        socket.nickname = datos;
                        nicknames.push(socket.nickname);
                        io.sockets.emit('nombre usuario', nicknames);
                    }
                });

                socket.on('disconnect', datos =>{

                    if(!socket.nickname){
                        return;
                    }{
                        nicknames.splice(nicknames.indexOf(socket.nickname), 1);
                        io.sockets.emit('nombre usuario', nicknames);
                    }

                })

    });
}