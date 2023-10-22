import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../config/db";
import { ParamsSchema } from "../config/zod";

async function Create(request: FastifyRequest, reply: FastifyReply) {}

async function List(request: FastifyRequest, reply: FastifyReply) {
  const users = await prisma.user.findMany();

  reply.send(users);
}

async function Show(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return reply.status(404).send();
  }

  reply.send(user);
}

async function Update(request: FastifyRequest, reply: FastifyReply) {}

async function Delete(request: FastifyRequest, reply: FastifyReply) {
  const { id } = ParamsSchema.parse(request.params);

  await prisma.user.delete({
    where: { id },
  });

  reply.status(204).send();
}

export { Create, List, Update, Delete, Show };
