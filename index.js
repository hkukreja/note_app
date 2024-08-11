import express from "express";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import { STATUS, VARIABLES } from "./config/common.js";
import router from "./routes/index.js";
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();
dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", router);

const requestErrHandler = (err, req, res, next) => {
    if (req.xhr) {
        return res.status(STATUS.SERVER_ERROR).send({
            status: 'failed',
            message: err.message,
            statusCode: STATUS.SERVER_ERROR,
            remarks: 'This incident has reported.',
        });
    }

    return res.status(STATUS.SERVER_ERROR).json({ error: err });
};

app.use(requestErrHandler);

app.listen(VARIABLES.PORT, () => {
    console.log(`Server running on port: ${VARIABLES.PORT}`);
});

export default app;