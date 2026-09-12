import pino from "pino";

const logger = pino({
  transport: {
    level: "debug", //process.env.LEVEL as string || 'info',
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export default logger;
