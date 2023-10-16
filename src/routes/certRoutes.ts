import { FastifyInstance } from "fastify";

import { Create, List, Update, Delete } from "../controllers/certController";

export async function certRoutes(app: FastifyInstance) {
  app.get("/cert", List);
  app.post("/cert", Create);
  app.put("/cert/:id", Update);
  app.delete("/cert", Delete);
}
