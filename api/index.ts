import fastify from "fastify";
import { saveImage } from "./saveImage";

const server = fastify();

server.get("/ping", async (request, reply) => {
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
