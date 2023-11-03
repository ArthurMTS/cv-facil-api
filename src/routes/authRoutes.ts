import { FastifyInstance } from "fastify";

import {
  Create,
} from "../controllers/userController";
import { LogOut, Login } from "../controllers/authController";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", Create);
  app.post("/login", Login);
  app.delete("/logout", { preHandler: [app.authenticate] }, LogOut);
}
