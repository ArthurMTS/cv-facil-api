import fastify from "fastify";
import cors from "@fastify/cors";

import { userRoutes } from "./routes/userRoutes";
import { cvRoutes } from "./routes/cvRoutes";

const app = fastify();

app.register(cors, {
  origin: true, // permitir todas as origens
  // alterar quando o backend for para produção
});
app.register(userRoutes);
app.register(cvRoutes);

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
