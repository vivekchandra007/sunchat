// index.js
var name = "";
var socket = io();
socket.on('new user', function(name) {
    $('#audiotagNewMessage').trigger("play");
    $('#messages').prepend('<p style="color: #3498db">@<b><u>' + name + '</u></b> just joined.</p>');
    $('#messages').scrollTop(0);
});

socket.on('chat message', function(msg) {
    $('#audiotagNewMessage').trigger("play");
    $('#messages').prepend('<p>' + msg + '</p>');
    $('#messages').scrollTop(0);
});

socket.on('typing', function(someone) {
    if (!$('#typing').is(':visible')) {
        $('#typing').html(someone + " is typing...");
        $('#typing').show();
        setTimeout(function() {
            $('#typing').hide();
        }, 2000);
    }
});

$(document).ready(function() {
    $('#typing').hide();
    $('#errorEnterSunchat').hide();
    $('#enterSunchatModal').modal('show');
    $('#formEnterSunchat').submit(function() {
        name = $('#name').val();
        if (name == null || name == '') {
            name = "";
            $('#errorEnterSunchat').html('<strong>Error: </strong>You must provide a name to enter Sunchat');
            $('#errorEnterSunchat').show();
            $('#name').focus();
            setTimeout(function() {
                $('#errorEnterSunchat').slideUp();
            }, 3000)
        } else {
            sessionStorage.name = name;
            $('#enterSunchatModal').modal('hide');
            socket.emit('new user', name);
            $('#messages').prepend('<p style="color: #2ecc71">You joined Sunchat @<b><u>' + name + '</u></b></p>');
            $('#messages').scrollTop(0);
            $('#txtMessage').focus();
            $('#title').prepend(name + " @ ");
        }
        return false;
    });
    $('#formMessage').submit(function() {
        var msg = $('#txtMessage').val();
        if (name != "" && msg && msg != null && msg != '') {
            socket.emit('chat message', '@<b><u>' + name + "</u></b>: " + msg);
            // $('#messages').prepend($('<li>').text(msg));
            $('#messages').prepend('<p style="color: #2ecc71">Me: ' + msg + '</p>');
            $('#messages').scrollTop(0);
            $('#txtMessage').val('');
        }
        return false;
    });

    $('#txtMessage').on('change keyup paste', function() {
        socket.emit('typing', name);
    });
});