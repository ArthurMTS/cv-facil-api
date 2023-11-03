import { FastifyInstance } from "fastify";

import {
  // Create,
  List,
  Update,
  Delete,
  Show,
} from "../controllers/userController";

export async function userRoutes(app: FastifyInstance) {
  app.get("/users", { preHandler: [app.authenticate] }, List);
  app.get("/users/:id", { preHandler: [app.authenticate] }, Show);
  // app.post("/users", { preHandler: [app.authenticate] }, Create);
  app.put("/users/:id", { preHandler: [app.authenticate] }, Update);
  app.delete("/users/:id", { preHandler: [app.authenticate] }, Delete);
}
