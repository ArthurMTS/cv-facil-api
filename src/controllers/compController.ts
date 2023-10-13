import { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "../config/db";
import { z } from "zod";

async function Create(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    cVId: z.string().uuid(),
    title: z.string(),
  });

  const { cVId, title } = BodySchema.parse(request.body);

  await prisma.competency.create({
    data: {
      cVId,
      title,
    },
  });

  return reply.status(201).send();
}

async function List(request: FastifyRequest, reply: FastifyReply) {
  const ParamsSchema = z.object({
    cVId: z.string().uuid(),
  });

  const { cVId } = ParamsSchema.parse(request.params);

  const competencies = await prisma.competency.findMany({
    where: {
      cVId,
    },
  });

  return reply.status(200).send(competencies);
}

async function Update(request: FastifyRequest, reply: FastifyReply) {
  const ParamsSchema = z.object({
    id: z.number(),
  });

  const BodySchema = z.object({
    cVId: z.string().uuid(),
    title: z.string().optional(),
  });

  const { cVId, title } = BodySchema.parse(request.body);
  const { id } = ParamsSchema.parse(request.params);

  await prisma.competency.update({
    data: {
      title,
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

  await prisma.competency.delete({
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

  await prisma.competency.deleteMany({
    where: {
      cVId,
    },
  });

  return reply.status(204).send();
}

export { Create, List, Update, Delete, DeleteAll };
