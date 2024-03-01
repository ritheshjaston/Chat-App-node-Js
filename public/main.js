var container = document.getElementById('container');
const username = prompt("Please enter your name:");
$(function () {
  const socket = io();

  socket.emit("setUsername", username);

  $("form").submit(function () {
    socket.emit("chat message", $("#input").val());
    $("#input").val("");
    return false;
  });

  socket.on("chat message", function (msg) {
    console.log(msg);
    const a = msg.split(":");
    console.log(a[1]);

    var newMessage = document.createElement('div');
    if (a[0] == username) {
        newMessage.className = 'message right';
    } else {
        newMessage.className = 'message left';
    }
    newMessage.textContent = a[0] + ' : ' + a[1];
    var container = document.getElementById('container'); // Replace 'yourContainerId' with the actual ID of your container
    container.appendChild(newMessage);
});

});
