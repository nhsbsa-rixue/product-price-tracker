import { readCsvToArray } from "../dbRepos";

const setupDBClient = async (app) => {
  app.use(async (req: Req, _, next) => {
    req.users = await readCsvToArray("src/dbRepos/users.csv");
    req.products = await readCsvToArray("src/dbRepos/products.csv");
    req.watching = await readCsvToArray("src/dbRepos/watching.csv");
    next();
  });
};

export default setupDBClient;
