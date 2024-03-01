$(function () {
    const socket = io();

    // Prompt the user for their name
    const username = prompt("Please enter your name:");
    socket.emit('setUsername', username);

    $('form').submit(function () {
        socket.emit('chat message', $('#input').val());
        $('#input').val('');
        return false;
    });

    socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
    });
});
