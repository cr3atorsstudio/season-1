import fastify from "fastify";
import { saveImage } from "./saveImage";
import fastifyEnv from "@fastify/env";
import cors from "@fastify/cors";
import { tokenize, getTokenizer } from "kuromojin";
import { QueryString } from "aws-sdk/clients/cloudwatchlogs";
const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 8080,
    },
  },
};
const options = {
  confKey: "config", // optional, default: 'config'
  schema: schema,
  dotenv: true,
};

const server = fastify().register(fastifyEnv, options);
server.register(cors, {
  origin: [
    "https://shiritori-web.web.app",
    "https://shiritori.cr3ators.studio",
    "http://localhost:5173",
  ],
});

server.register(require("@immobiliarelabs/fastify-sentry"), {
  dsn: process.env.SENTRY_DSN,
});

server.post<{
  Body: {
    lastWord: string;
    currentWord: string;
    currentWordNum: number;
    tokenId: string;
  };
}>("/generate", async (request, reply) => {
  try {
    const { lastWord, currentWord, currentWordNum, tokenId } = request.body;
    console.log(currentWordNum);
    if (!lastWord && !currentWord) {
      //TODO: return 4xx error
      throw new Error("Wrong words");
    }

    const resultTokenId: any = await saveImage(
      lastWord,
      currentWord,
      currentWordNum,
      parseInt(tokenId)
    );
    return { success: true, tokenId: resultTokenId };
  } catch (e) {
    Sentry.captureException(e);
  }
});

server.get<{ Querystring: { word: string; tokenId: number } }>(
  "/validate",
  async (request, reply) => {
    const { word, tokenId } = request.query;
    await getTokenizer({
      dicPath: "./dict",
    });
    const tokens = await tokenize(word);

    const lastTokenId = tokenId > 2 ? tokenId - 2 : 0;

    return {
      success: true,
      tokens: tokens,
    };
  }
);

const port = process.env.PORT || 8080;
const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;
const host = IS_GOOGLE_CLOUD_RUN ? "0.0.0.0" : "127.0.0.1";

//@ts-ignore
server.listen({ port: port, host: host }, (err, address) => {
  if (err) {
    server.log.error(err);
    Sentry.captureException(err);
    process.exit(1);
  }
  console.log(process.env.BUCKET_NAME);
  console.log(`Server listening at ${address}`);
});
