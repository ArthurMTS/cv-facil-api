import { FastifyInstance } from "fastify";

import {
  Create,
  List,
  Show,
  Update,
  Delete,
} from "../controllers/cvController";

export async function cvRoutes(app: FastifyInstance) {
  app.get("/cvs/:userId", { preHandler: [app.authenticate] }, List);
  app.get("/cv/:id", { preHandler: [app.authenticate] }, Show);
  app.post("/cvs", { preHandler: [app.authenticate] }, Create);
  app.put("/cvs/:id", { preHandler: [app.authenticate] }, Update);
  app.delete("/cvs/:id", { preHandler: [app.authenticate] }, Delete);
}
