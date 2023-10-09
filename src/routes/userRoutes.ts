import { FastifyInstance } from "fastify";

import { Create, List, Update, Delete } from "../controllers/userController";

export async function userRoutes(app: FastifyInstance) {
  app.get("/users", List);
  app.post("/users", Create);
  app.put("/users/:id", Update);
  app.delete("/users/:id", Delete);
}
