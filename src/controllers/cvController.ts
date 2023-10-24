import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "../config/db";
import { ParamsSchema } from "../config/zod";

async function Create(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    userId: z.string().uuid(),
    job: z.string(),
    phone: z.string(),
    linkedin: z.string(),
    github: z.string(),
    resume: z.string(),
  });
  const { userId, job, phone, linkedin, github, resume } = BodySchema.parse(
    request.body,
  );

  const cv = await prisma.cV.create({
    data: {
      userId,
      jobTitle: job,
      phone,
      linkedin,
      github,
      resume,
    },
  });

  return reply.status(201).send(cv.id);
}

async function List(request: FastifyRequest, reply: FastifyReply) {
  const QuerySchema = z.object({
    search: z.string().optional(),
  });
  const ParamsSchema = z.object({
    userId: z.string().uuid(),
  });
  const { userId } = ParamsSchema.parse(request.params);
  const { search } = QuerySchema.parse(request.query);

  let cvs;

  if (search)
    cvs = await prisma.cV.findMany({
      where: {
        jobTitle: { contains: search },
        userId,
      },
    });
  else
    cvs = await prisma.cV.findMany({
      where: { userId },
    });

  reply.send(cvs);
}

async function Show(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  const cv = await prisma.cV.findMany({
    where: { id },
  });

  reply.send(cv);
}

async function Update(request: FastifyRequest, reply: FastifyReply) {
  const BodySchema = z.object({
    job: z.string().optional(),
    phone: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    resume: z.string().optional(),
  });

  const { id } = ParamsSchema.parse(request.params);
  const { job, phone, linkedin, github, resume } = BodySchema.parse(
    request.body,
  );

  await prisma.cV.update({
    data: {
      jobTitle: job,
      phone,
      linkedin,
      github,
      resume,
    },
    where: {
      id,
    },
  });

  return reply.status(204).send();
}

async function Delete(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  await prisma.cV.delete({
    where: {
      id,
    },
  });

  reply.status(204).send();
}

export { Create, List, Show, Update, Delete };
