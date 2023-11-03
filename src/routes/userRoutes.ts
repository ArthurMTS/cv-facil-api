import { FastifyInstance } from "fastify";

import {
  Create,
  List,
  Update,
  Delete,
  Show,
} from "../controllers/userController";

export async function userRoutes(app: FastifyInstance) {
  app.get("/users", List);
  app.get("/users/:id", Show);
  app.post("/users", Create);
  app.put("/users/:id", Update);
  app.delete("/users/:id", Delete);
}
