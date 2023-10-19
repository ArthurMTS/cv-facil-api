import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../config/db";
import { ParamsSchema } from "../config/zod";

async function Create(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    name: z.string(),
    avatar: z.string(),
    email: z.string().email(),
    password: z.string(),
  });
  const { name, email, avatar, password } = BodySchema.parse(request.body);
  const User = await prisma.user.create({
    data: { name, email, avatar, password },
  });
  return reply.status(201).send(User.id);
}

async function List(request: FastifyRequest, reply: FastifyReply) {
  const users = await prisma.user.findMany();
  return reply.status(200).send(users);
}

async function Update(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    name: z.string().optional(),
    avatar: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
  });
  const { id } = ParamsSchema.parse(request.params);
  const { name, email, avatar, password } = BodySchema.parse(request.body);
  const User = await prisma.user.update({
    data: { name, email, avatar, password },
    where: { id },
  });
  return reply.status(204).send(User);
}

async function Delete(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);
  const User = await prisma.user.delete({
    where: { id },
  });
  return reply.status(204).send();
}

export { Create, List, Update, Delete };
