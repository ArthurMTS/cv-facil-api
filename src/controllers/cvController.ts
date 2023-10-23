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
    request.body
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
  const QueryParamsSchema = z.object({
    search: z.string().optional(),
  });
  const { id } = ParamsSchema.parse(request.params);
  const queryParams = QueryParamsSchema.parse(request.query);

  let cvs: any;

  if (queryParams.search?.match(/^[A-Za-z]+/)) {
    cvs = await prisma.cV.findMany({
      where: {
        jobTitle: { contains: queryParams.search },
        userId: id,
      },
    });
  } else {
    cvs = await prisma.cV.findMany({
      where: { userId: id },
    });
  }

  reply.send(cvs);
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
    request.body
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
  const QueryParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const queryParams = QueryParamsSchema.parse(request.params);

  const search = queryParams.id;

  let deletedCVs = [];

  const deletedCV = await prisma.cV.delete({
    where: {
      id: search,
    },
  });
  deletedCVs.push(deletedCV);

  reply.send(deletedCVs);
}

export { Create, List, Update, Delete };
