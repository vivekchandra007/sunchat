// index.js
var name = "";
var socket = io();
socket.on('new user', function(name) {
    $('#audiotagNewMessage').trigger("play");
    $('#messages').prepend('<p style="color: #3498db">' + name + ' just joined.</p>');
    $('#messages').scrollTop(0);
});

socket.on('chat message', function(msg) {
    $('#audiotagNewMessage').trigger("play");
    $('#messages').prepend('<p>' + msg + '</p>');
    $('#messages').scrollTop(0);
});

$(document).ready(function() {
    $('#enterSunchatError').hide();
    $('#enterSunchatModal').modal('show');
    $('#btnEnterSunchat').click(function() {
        name = $('#name').val();
        if (name == null || name == '') {
            $('#enterSunchatError').html('<strong>Error: </strong>You must provide a name to enter Sunchat');
            $('#enterSunchatError').show();
            $('#name').focus();
            setTimeout(function() {
                $('#enterSunchatError').slideUp();
            }, 3000)
        } else {
            sessionStorage.name = name;
            $('#enterSunchatModal').modal('hide');
            socket.emit('new user', name);
            $('#messages').prepend('<p style="color: #2ecc71">You joined Sunchat.</p>');
            $('#messages').scrollTop(0);
            $('#txtMessage').focus();
        }
    });
    $('#formMessage').submit(function() {
        var msg = $('#txtMessage').val();
        if (msg && msg != null && msg != '') {
            socket.emit('chat message', msg);
            // $('#messages').prepend($('<li>').text(msg));
            $('#messages').prepend('<p style="color: #2ecc71">Me: ' + msg + '</p>');
            $('#messages').scrollTop(0);
            $('#txtMessage').val('');
        }
        return false;
    });
});