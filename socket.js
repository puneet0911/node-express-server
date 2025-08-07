module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    console.log("New client connected with id:", socket.id);

    // Chat Room Logic
    socket.on("joinRoom", (room) => {
      socket.join(room);
      socket.to(room).emit("message", { user: "system", text: `A user joined room: ${room}` });
    });

    socket.on("leaveRoom", (room) => {
      socket.leave(room);
      socket.to(room).emit("message", { user: "system", text: `A user left room: ${room}` });
    });

    socket.on("chatMessage", ({ room, user, message }) => {
      io.to(room).emit("message", { user, text: message });
    });

    // Call Signaling Logic
    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", (data) => {
      console.log(`Incoming call from ${data.from}`);
      io.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
      });
    });

    socket.on("answerCall", (data) => {
      console.log(`Answering call from ${data.from}`);
      io.to(data.to).emit("callAccepted", data.signal);
    });
  });
};