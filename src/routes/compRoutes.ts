import { FastifyInstance } from "fastify";

import { Create, List, Update, Delete } from "../controllers/compController";

export async function compRoutes(app: FastifyInstance) {
  app.get("/comp", { preHandler: [app.authenticate] }, List);
  app.post("/comp", { preHandler: [app.authenticate] }, Create);
  app.put("/comp/:id", { preHandler: [app.authenticate] }, Update);
  app.delete("/comp", { preHandler: [app.authenticate] }, Delete);
}
