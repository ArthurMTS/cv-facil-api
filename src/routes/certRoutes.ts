import { FastifyInstance } from "fastify";

import { Create, List, Update, Delete } from "../controllers/certController";

export async function certRoutes(app: FastifyInstance) {
  app.get("/cert", { preHandler: [app.authenticate] }, List);
  app.post("/cert", { preHandler: [app.authenticate] }, Create);
  app.put("/cert/:id", { preHandler: [app.authenticate] }, Update);
  app.delete("/cert", { preHandler: [app.authenticate] }, Delete);
}
