const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDatabase = require("./database/db");
const routes = require("./routes/index");
const errorMiddleware = require("./utils/globalErrorHandler");
const asyncErrorHandler = require("./utils/asyncErrorHandler");
require("dotenv").config();

// const numCPUs = require('node:os').availableParallelism();

// console.log(numCPUs)

// Create an Express application
const app = express();

// Define the port number, using the environment variable PORT if available, otherwise default to 3001
const port = process.env.PORT || 3001;

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    // Allow requests from specified origin(s)
    origin: [process.env.FRONTEND_URL, "http://localhost:3032"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

// database connection
connectDatabase();

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/", routes);

app.use("/uploads", express.static("uploads"));

// Define a route to get the image
app.get("/api/v1/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`${__dirname}/uploads/${imageName}`);
});
// Test Route
app.get(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>Node js Server</title>
            <style>
              body {
                background-color: #f2f2f2;
                height: 100%;
                font-family: Arial, sans-serif;
                display:flex;
                flex-direction: column;
                align-items:center;
                justify-content:center;
              }
              h1 {
                color: #333333;
                text-align: center;
              }
              p{
                color: #000;
                display:block;
              }
            </style>
          </head>
          <body>
            <h1>Server is Running &#128640;</h1>
          </body>
        </html>
      `;
    res.send(htmlContent);
  })
);
// error handler
app.use(errorMiddleware);
