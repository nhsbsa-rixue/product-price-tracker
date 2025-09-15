import config from "../config";
import RedisStore from "connect-redis";
import session, { MemoryStore } from "express-session";
import { createClient } from "redis";
import logger from "../logger";

// Save the session error to the local variable
const sessionToLocal = (req, res, next) => {
  if (req.session.error) {
    res.locals = {
      ...res.locals,
      error: req.session.error,
      body: req.session.body || {},
    };
    delete req.session.error;
  }
  next();
};

/**
 * Setup session for the applcation
 * @param {*} app
 */
const setupSession = (app: App) => {
  const sessionConfig = {
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store : new MemoryStore(),
  };

  if (config.REDIS_URL) {
    const redisClient = createClient({
      url: config.REDIS_URL,
    });
    redisClient.connect().catch(logger.error);

    // Initialize store.
    const redisStore = new RedisStore({
      client: redisClient,
    });

    sessionConfig.store = redisStore;
  }

  app.use(session(sessionConfig));
  app.use(sessionToLocal);
};

export default setupSession;
