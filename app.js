import express from "express";
import morgan from "morgan";
const app = express();
import dotenv from "dotenv";
import Connection from './database/connection.js';
import productRoute from './routes/orbitdb.routes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

//log request
app.use(morgan("tiny"));
// app.use(express.json());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
// app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  // access api from all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // send request with the methods GET, POST, PUT, DELETE, PATCH, OPTION
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use('/api', productRoute);

// empty route to ensure that the server is listening
app.get("/", async (req, res) =>
  res.status(200).json({ message: "Welcome to the API" })
);

app.listen(PORT, async () => {
  const connection = new Connection();
  await connection.main()
  console.log(`Server is opened on http://${HOST}:${PORT}`);
});

export default app;
