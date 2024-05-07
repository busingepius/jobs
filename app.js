require("dotenv").config();
require("express-async-errors");

const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const {connectDB} = require("./db/connect");
const {errorHandlerMiddleware,notFoundMiddleware} = require("./middleware");
const {authRouter} = require("./routes/authRoutes");
const {jobRoutes} = require("./routes/jobRoutes");

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api/v1/jobs/docs",swaggerUI.serve,swaggerUI.setup(swaggerDocument));

// middleware
app.use(express.json());

//routes
app.use("/api/v1/jobs/",authRouter);
app.use("/api/v1/jobs",jobRoutes);

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function start() {
    try {
        await connectDB(process.env.MONGO_URI);
        server.listen(port, function () {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
