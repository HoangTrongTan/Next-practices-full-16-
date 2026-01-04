https://kombai.com/tailwind/cheat-sheet/

// gửi cho chính client
socket.emit("welcome", { msg: "Hello " + socket.id });

// gửi cho tất cả
io.emit("new-user", { id: socket.id });

// gửi cho tất cả trừ client hiện tại
socket.broadcast.emit("user-joined", { id: socket.id });

// gửi cho client cụ thể
io.to(socket.id).emit("private-msg", { msg: "This is private" });

socket.on("disconnect", () => {
console.log("Client disconnected:", socket.id);
});





middleware: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
cache in NextJs: https://nextjs.org/docs/app/api-reference/directives/use-cache

FILE-system conventions
Parallel Routes
Convention
Slots
default.js

https://react-hook-form.com/get-started#Quickstart