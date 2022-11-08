import fastify from "fastify";

const app = async () => {
  const app = fastify();

  app.get("/", async (req, reply) => {
    return "Hello world!!";
  });

  // 開発時は vite がサーバーを作成するため、開発時には起動しなくてよい
  if (process.env.NODE_ENV === "production") {
    try {
      await app.listen(3000);
      const address = app.server.address();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  return app;
};

// exportName で指定した名前で export する
// 未指定の場合は `viteNodeApp` という名前で export する
export const viteNodeApp = app();
