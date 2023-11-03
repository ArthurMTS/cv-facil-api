import { FastifyInstance } from "fastify";

import { Create, List, Update, Delete } from "../controllers/compController";

export async function compRoutes(app: FastifyInstance) {
  app.get("/comp", List);
  app.post("/comp", Create);
  app.put("/comp/:id", Update);
  app.delete("/comp", Delete);
}
