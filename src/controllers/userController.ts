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

  let user;

  try {
    user = await prisma.user.create({
      data: { name, email, avatar, password },
    });
  } catch (err) {
    return reply.status(500).send(err);
  }

  return reply.status(201).send(user?.id);
}

async function List(request: FastifyRequest, reply: FastifyReply) {
  let users;

  try {
    users = await prisma.user.findMany();
  } catch (err) {
    return reply.status(500).send(err);
  }

  reply.send(users);
}

async function Show(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  let user;

  try {
    user = await prisma.user.findUnique({
      where: { id },
    });
  } catch (err) {
    return reply.status(500).send(err);
  }

  if (!user) {
    return reply.status(404).send();
  }

  reply.send(user);
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

  let user;

  try {
    user = await prisma.user.update({
      data: { name, email, avatar, password },
      where: { id },
    });
  } catch (err) {
    return reply.status(500).send(err);
  }

  return reply.status(204).send(user);
}

async function Delete(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (err) {
    return reply.status(500).send(err);
  }

  reply.status(204).send();
}

export { Create, List, Update, Delete, Show };
