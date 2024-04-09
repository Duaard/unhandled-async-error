import Fastify from "fastify";
import Redis from "@fastify/redis";

start().catch((err) => {
  console.error("Error starting server");
});

/**
 * Run the server!
 */
async function start() {
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
      console.error("Registering Redis error");
      throw new Error("Error registering Redis");
    }

    fastify.get("/", async (request, reply) => {
      return { hello: "world" };
    });
  };

  try {
    await fastifyPluginRegistration(fastify);
  } catch (err) {
    fastify.log.error("There was an error registering plugins");
    throw new Error("Error registering plugins");
  }

  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error("There was an error on fastify.listen");
    process.exit(1);
  }
}
