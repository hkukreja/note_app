import mongoose from "mongoose";
import { VARIABLES } from "../config/common.js";

export const dbConnection = () => {
    return mongoose.connect(VARIABLES.DB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => { console.log("DB connected!") })
        .catch(error => console.log(`Error in DB connection: ${error}`))
}