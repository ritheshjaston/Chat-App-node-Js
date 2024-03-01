var container = document.getElementById('container');
const username = prompt("Please enter your name:");
$(function () {
  const socket = io();
    
  socket.emit("setUsername", username);

  $("form").submit(function () {
    if($("#input").val()!=""){

        socket.emit("chat message", $("#input").val());
        $("#input").val("");
        return false;
    }
  });

  socket.on("chat message", function (msg) {
    console.log(msg);
    const a = msg.split(":");
    let array = a.length;
    console.log(array)
    console.log(a[1]);

    var newMessage = document.createElement('div');
    if(array!=1){
        if (a[0] == username) {
            newMessage.className = 'message right';
            newMessage.textContent = a[1];
        } else {
            newMessage.className = 'message left';
            newMessage.textContent = a[0] + ' : ' + a[1];
        }
    }else{
        newMessage.className = 'message center';
        newMessage.textContent = a[0] + ' is Joined to the chat';
    }
    
    var container = document.getElementById('container'); // Replace 'yourContainerId' with the actual ID of your container
    container.appendChild(newMessage);
});

});
