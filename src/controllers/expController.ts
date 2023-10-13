import { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "../config/db";
import { z } from "zod";

async function Create(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    cVId: z.string().uuid(),
    title: z.string(),
    city: z.string(),
    state: z.string(),
    description: z.string(),
    start: z.string(),
    end: z.string(),
  });

  const { cVId, title, city, state, description, start, end } =
    BodySchema.parse(request.body);

  await prisma.profExp.create({
    data: {
      cVId,
      title,
      city,
      state,
      description,
      start,
      end,
    },
  });

  return reply.status(201).send();
}

async function List(request: FastifyRequest, reply: FastifyReply) {
  const ParamsSchema = z.object({
    cVId: z.string().uuid(),
  });

  const { cVId } = ParamsSchema.parse(request.params);

  const exps = await prisma.profExp.findMany({
    where: {
      cVId,
    },
  });

  return reply.status(200).send(exps);
}

async function Update(request: FastifyRequest, reply: FastifyReply) {
  const ParamsSchema = z.object({
    id: z.number(),
  });

  const BodySchema = z.object({
    cVId: z.string().uuid(),
    title: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    description: z.string().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
  });

  const { cVId, title, city, state, description, start, end } =
    BodySchema.parse(request.body);
  const { id } = ParamsSchema.parse(request.params);

  await prisma.profExp.update({
    data: {
      title,
      city,
      state,
      description,
      start,
      end,
    },
    where: {
      id,
      cVId,
    },
  });

  return reply.status(204).send();
}

async function Delete(request: FastifyRequest, reply: FastifyReply) {
  const ParamsSchema = z.object({
    id: z.number(),
  });

  const { id } = ParamsSchema.parse(request.params);

  await prisma.profExp.delete({
    where: {
      id,
    },
  });

  return reply.status(204).send();
}

async function DeleteAll(request: FastifyRequest, reply: FastifyReply) {
  const ParamsSchema = z.object({
    cVId: z.string().uuid(),
  });

  const { cVId } = ParamsSchema.parse(request.params);

  await prisma.profExp.deleteMany({
    where: {
      cVId,
    },
  });

  return reply.status(204).send();
}

export { Create, List, Update, Delete, DeleteAll };
