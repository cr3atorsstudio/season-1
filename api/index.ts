import fastify from "fastify";
import { saveImage } from "./saveImage";
import fastifyEnv from "@fastify/env";
import cors from "@fastify/cors";

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
server.register(cors, { origin: true });

server.post<{
  Body: {
    lastWord: string;
    currentWord: string;
    tokenId: string;
  };
}>("/generate", async (request, reply) => {
  const { lastWord, currentWord, tokenId } = request.body;
  if (!lastWord && !currentWord) {
    //TODO: return 4xx error
    throw new Error("Wrong words");
  }
  //TODO: Confirmation of existence of tokenId's metadata
  const lastLastWord: any = await saveImage(
    lastWord,
    currentWord,
    parseInt(tokenId)
  );
  return { success: true, word: lastLastWord };
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
