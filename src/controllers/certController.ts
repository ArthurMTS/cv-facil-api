import { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "../config/db";
import { z } from "zod";

async function Create(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    cVId: z.string().uuid(),
    title: z.string(),
    year: z.number(),
  });

  const { cVId, title, year } = BodySchema.parse(request.body);

  await prisma.certification.create({
    data: {
      cVId,
      title,
      year,
    },
  });

  return reply.status(201).send();
}

async function List(request: FastifyRequest, reply: FastifyReply) {
  const ParamsSchema = z.object({
    cVId: z.string().uuid(),
  });

  const { cVId } = ParamsSchema.parse(request.params);

  const certifications = await prisma.certification.findMany({
    where: {
      cVId,
    },
  });

  return reply.status(200).send(certifications);
}

async function Update(request: FastifyRequest, reply: FastifyReply) {
  const ParamsSchema = z.object({
    id: z.number(),
  });

  const BodySchema = z.object({
    cVId: z.string().uuid(),
    title: z.string().optional(),
    year: z.number().optional(),
  });

  const { cVId, title, year } = BodySchema.parse(request.body);
  const { id } = ParamsSchema.parse(request.params);

  await prisma.certification.update({
    data: {
      title,
      year,
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

  await prisma.certification.delete({
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

  await prisma.certification.deleteMany({
    where: {
      cVId,
    },
  });

  return reply.status(204).send();
}

export { Create, List, Update, Delete, DeleteAll };
