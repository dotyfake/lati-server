const socketIo = (io) => {
  let activeUsers = [];
  let rooms = []
io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      // console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // console.log("User Disconnected", activeUsers);
    rooms = rooms.filter((room) => socket.id !== room.socketId)
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  socket.on("join-room", (userId) => {
    rooms.push({userId, socketId: socket.id})
  })

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const room = rooms.find((r) => r.userId === receiverId);
    // console.log("Data: ", data , "room:", rooms)
    if (room) {
      io.to(room.socketId).emit("receive-message", data);
    }
  });
});
}

module.exports = socketIo