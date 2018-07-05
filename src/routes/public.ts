import * as express from "express";
import { ResponseMessage } from "../domains";

const publicRouter = express.Router();

/**
 *
 * @api {GET} /_api/public/health Health Check
 * @apiName HealthCheck
 * @apiGroup public
 * @apiVersion  0.1.0
 * @apiDescription Lets a user see if the API service is available
 *
 * @apiSuccess (204) healthy Returns a simple message if API is available
 *
 */
publicRouter.get("/health", (req, res) => {

  const healthResponse: ResponseMessage = {
      data: {
          healthy: true
      },
      message: "",
      success: true,
      statusCode: 200
  };

  res.json(healthResponse);
});

export default publicRouter;