const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
dotenv.config();
const connectDB = require("./config/db");
const folderRoutes = require("./routes/folderRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
    origin: true,
    credentials: true,
};
app.use(cors(corsOptions));
connectDB();

app.use(express.json());

app.use("/api", folderRoutes);
app.use("/api", fileRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client Disconnected:", socket.id);
    });
});

app.set("io", io);

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
