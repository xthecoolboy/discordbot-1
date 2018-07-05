import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as createError from "http-errors";

import publicRouter from "./routes/public";

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};

const expressApp = express();

if (expressApp.get("env") === "development") {
  expressApp.use(logger("dev"));
} else if (expressApp.get("env") === "production") {
  expressApp.use(logger("combined"));
}

expressApp.use(cors(corsOptions));
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(cookieParser());

expressApp.use("/_api/public", publicRouter);

expressApp.use(function(req, res, next) {
  next(new createError.NotFound());
});

expressApp.use(function(err: any, req: express.Request, res: express.Response, next: express.RequestHandler) {
  res.status(err.status || 500);
  res.send(err.message);
});

expressApp.set("json replacer", (key: any, value: any) => {
  if (value === null) {
    return undefined;
  }
  return value;
});

export default expressApp;
