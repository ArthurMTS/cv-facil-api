import { FastifyInstance } from "fastify";

import {
  Create,
  List,
  Show,
  Update,
  Delete,
} from "../controllers/cvController";

export async function cvRoutes(app: FastifyInstance) {
  app.get("/cvs/:userId", List);
  app.get("/cv/:id", Show);
  app.post("/cvs", Create);
  app.put("/cvs/:id", Update);
  app.delete("/cvs/:id", Delete);
}
