import z from 'zod'
import registerService from '@/services/register'
import { FastifyRequest, FastifyReply } from 'fastify'

export default async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  // TODO: Treate error presentation
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    await registerService({ name, email, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
