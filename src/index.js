import Fastify from "fastify";
import Redis from "@fastify/redis";

const fastify = Fastify({
  logger: true,
});

const fastifyPluginRegistration = async (fastify) => {
  try {
    await fastify.register(Redis, {
      host: "localhost",
      username: "test",
      password: "123",
    });
  } catch (err) {
    console.error(err);
    throw err;
  }

  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
};

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastifyPluginRegistration(fastify);
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start().catch((err) => {
  console.error("Unexpected error");
});
