$(function(){
    const socket = io();
    var nick = '';

    ///ELEMENTOS DEL DOM
    const messageform = $('#message-form');
    const messagebox = $('#message');
    const chat = $('#chat');

    const nickform = $('#nick-form');
    const nickerror = $('#nick-error');
    const nickname = $('#nick-name');
    const username = $('#user-name');

    ///EVENTOS

    ///ENVIAMOS MENSAJE AL SERVIDOR
    messageform.submit( e =>{
        e.preventDefault();
        socket.emit('enviar mensaje',messagebox.val());
        messagebox.val('');
    });

    //OBTENEMOS RESPUESTA DEL SERVIDOR
    socket.on('nuevo mensaje', function(datos){
        //console.log(datos);
        let color = "#f4f4f4";
        if(nick == datos.username){
                    color = '#9ff4c5';
                }
        chat.append(`<div class="msg-area d-flex" style="background-color:${color}"><b>${datos.username}: </b><p class="msg">${datos.msg}</p></div>`);
    });

    //NUEVO USUARIO

    nickform.submit( e =>{

        e.preventDefault();

        socket.emit('nuevo usuario',nickname.val(), datos =>{

            if(datos){
                nick = nickname.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            }else{
                nickerror.html('<div class="alert">El nombre de usuario no esta disponible</div>');
            }

            nickname.val('');

        });
    });

    //OBTENER ARRAYS DE USUARIOS CONECTADOS

    socket.on('nombre usuario', datos =>{

        let html = '';
        let color = '#000';
        let salir = '';

        for(let i = 0; i < datos.length; i++){
            if(nick == datos[i]){
                color = '#027f43';
                salir = `<a class="enlace-salir" href="/">SALIR</a>`;
            }else{
                color = '#000';
                salir = '';
            }
            html += `<p style="color:${color}"><i class="fas fa-user"></i> ${datos[i]} ${salir}</p>`;
        }

        username.html(html);

    });

})