import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "../config/db";

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
  const QuerySchema = z.object({
    cVId: z.string().uuid(),
  });

  const { cVId } = QuerySchema.parse(request.query);

  const competencies = await prisma.competency.findMany({
    where: {
      cVId,
    },
  });

  return reply.status(200).send(competencies);
}

async function Update(request: FastifyRequest, reply: FastifyReply) {
  const ParamsSchema = z.object({
    id: z.string(),
  });
  const BodySchema = z.object({
    title: z.string().optional(),
  });

  const { title } = BodySchema.parse(request.body);
  const { id } = ParamsSchema.parse(request.params);

  await prisma.competency.update({
    data: {
      title,
    },
    where: {
      id: +id,
    },
  });

  return reply.status(204).send();
}

async function Delete(request: FastifyRequest, reply: FastifyReply) {
  const QuerySchema = z.object({
    id: z.string().optional(),
    cVId: z.string().uuid().optional(),
  });

  const { id, cVId } = QuerySchema.parse(request.query);

  if (id && !cVId)
    await prisma.competency.delete({
      where: {
        id: +id,
      },
    });
  else if (!id && cVId)
    await prisma.competency.deleteMany({
      where: {
        cVId,
      },
    });
  else return reply.status(400).send();

  return reply.status(204).send();
}

export { Create, List, Update, Delete };
