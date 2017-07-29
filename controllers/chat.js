var numUsers = 0;
var users = [];

module.exports = function (socket) {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            user: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.user = username;
        users.push(username);
        ++numUsers;
        addedUser = true;

        socket.emit('user joined', {
            user: socket.user,
            users: users,
            numUsers: numUsers
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
            --numUsers;

            var index = users.indexOf(socket.user);
            if (index !== -1)
                users.splice(index, 1);

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                user: socket.user,
                numUsers: numUsers
            });
        }
    });

    setInterval(() => socket.emit('time', new Date().toTimeString()), 1000);
};
