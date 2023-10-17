import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "../config/db";

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
  const QuerySchema = z.object({
    cVId: z.string().uuid(),
  });
  const { cVId } = QuerySchema.parse(request.query);

  const exps = await prisma.profExp.findMany({
    where: {
      cVId,
    },
  });

  return reply.status(200).send(exps);
}

async function Update(request: FastifyRequest, reply: FastifyReply) {
  const ParamsSchema = z.object({
    id: z.string(),
  });

  const BodySchema = z.object({
    title: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    description: z.string().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
  });

  const { title, city, state, description, start, end } = BodySchema.parse(
    request.body,
  );
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
    await prisma.profExp.delete({
      where: {
        id: +id,
      },
    });
  else if (!id && cVId)
    await prisma.profExp.deleteMany({
      where: {
        cVId,
      },
    });
  else 
    return reply.status(400).send();

  return reply.status(204).send();
}

export { Create, List, Update, Delete };
