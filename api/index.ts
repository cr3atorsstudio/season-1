import fastify from "fastify";
import { saveImage } from "./saveImage";
import fastifyEnv from "@fastify/env";

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};
const options = {
  confKey: "config", // optional, default: 'config'
  schema: schema,
  dotenv: true,
};

const server = fastify().register(fastifyEnv, options);

server.get("/ping", async (request, reply) => {
  console.log(process.env.pinataApiKey);
  saveImage();
  return "pong\n";
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
