import dotenv from "dotenv";
dotenv.config();

export const VARIABLES = {
    PORT: process.env.PORT,
    DB: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV
}

export const STATUS = {
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
    NOT_FOUND: 404,
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204
} 