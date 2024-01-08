import z from 'zod'
import { RegisterService } from '@/services/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

export default async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  // TODO: Treate error presentation
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    /**
     * D - Dependency Inversoin Principle (from SOLID)
     * The file that needs to use RegisterService should send the dependencies to this
     * */
    const registerService = new RegisterService(usersRepository)

    registerService.execute({ name, email, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
