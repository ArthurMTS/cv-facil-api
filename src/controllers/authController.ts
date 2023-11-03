import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "../config/db";

export async function Login(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const { email, password } = BodySchema.parse(request.body);

  const user = await prisma.user.findUnique({ where: { email } });
  const isMatch = user && (await bcrypt.compare(password, user.password));

  if (!user || !isMatch) {
    return reply.status(401).send({
      message: "Invalid email or password",
    });
  }

  const token = request.jwt.sign({
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  });

  reply.setCookie("access_token", token, {
    path: "/",
    httpOnly: true,
    secure: true,
  });

  return { accessToken: token };
}

export async function LogOut(request: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("access_token");

  return reply.send({ message: "Logout successful" });
}
