import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";

import { userRoutes } from "./routes/userRoutes";
import { cvRoutes } from "./routes/cvRoutes";
import { expRoutes } from "./routes/expRoutes";
import { compRoutes } from "./routes/compRoutes";
import { certRoutes } from "./routes/certRoutes";
import { authRoutes } from "./routes/authRoutes";

const app = fastify();

app.register(cors, {
  origin: true, // permitir todas as origens
  // alterar quando o backend for para produção
});
app.register(fjwt, { secret: "supersecretcode-CHANGE_THIS-USE_ENV_FILE" });
// alterar quando o backend for para produção
app.addHook("preHandler", (req, res, next) => {
  req.jwt = app.jwt;
  return next();
});
app.register(fCookie, {
  secret: "some-secret-key", // alterar quando o backend for para produção
  hook: "preHandler",
});
app.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies.access_token;

    if (!token)
      return reply.status(401).send({ message: "Authentication required" });

    const decoded = request.jwt.verify<FastifyJWT["user"]>(token);
    request.user = decoded;
  },
);
app.register(userRoutes);
app.register(cvRoutes);
app.register(expRoutes);
app.register(compRoutes);
app.register(certRoutes);
app.register(authRoutes);

const port = Number(process.env.PORT) || 3333;

app.listen(
  {
    port,
  },
  err => {
    if (err) console.error(err);
    else console.log(`API Running on http://localhost:${port}`);
  },
);
