import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "../config/db";

async function Create(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    email: z.string().email(),
    name: z.string(),
    avatar: z.string(),
    password: z.string(),
  });

  const { name, email, avatar, password } = BodySchema.parse(request.body);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      avatar,
      password,
    },
  });

  return reply.status(201).send(user.id);
}

async function List(request: FastifyRequest, reply: FastifyReply) {}

async function Update(request: FastifyRequest, reply: FastifyReply) {}

async function Delete(request: FastifyRequest, reply: FastifyReply) {}

export { Create, List, Update, Delete };
