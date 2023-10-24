import { FastifyInstance } from "fastify";

import { Create, List, Update, Delete } from "../controllers/cvController";

export async function cvRoutes(app: FastifyInstance) {
  app.get("/cvs/:id", List);
  app.post("/cvs", Create);
  app.put("/cvs/:id", Update);
  app.delete("/cvs/:id", Delete);
}
