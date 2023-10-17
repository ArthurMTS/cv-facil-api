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

async function List(request: FastifyRequest, reply: FastifyReply) {}

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

async function Delete(request: FastifyRequest, reply: FastifyReply) {}

export { Create, List, Update, Delete };
