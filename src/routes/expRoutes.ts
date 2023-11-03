import { FastifyInstance } from "fastify";

import { Create, List, Update, Delete } from "../controllers/expController";

export async function expRoutes(app: FastifyInstance) {
  app.get("/exp", { preHandler: [app.authenticate] }, List);
  app.post("/exp", { preHandler: [app.authenticate] }, Create);
  app.put("/exp/:id", { preHandler: [app.authenticate] }, Update);
  app.delete("/exp", { preHandler: [app.authenticate] }, Delete);
}
