import { FastifyInstance } from "fastify";

import { Create, List, Update, Delete } from "../controllers/expController";

export async function expRoutes(app: FastifyInstance) {
  app.get("/exp", List);
  app.post("/exp", Create);
  app.put("/exp/:id", Update);
  app.delete("/exp", Delete);
}
