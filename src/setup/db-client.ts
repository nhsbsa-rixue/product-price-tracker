import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import config from "../config";

const dynamoDBClient = new DynamoDBClient({
  region: config.AWS_REGION
});
const dbClient = DynamoDBDocumentClient.from(dynamoDBClient);

const setupDBClient = async (app) => {
  app.use((req: Req, res, next) => {
    req.dbClient = dbClient;
    next();
  });
};

export default setupDBClient;
