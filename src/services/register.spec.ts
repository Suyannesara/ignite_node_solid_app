import { expect, describe, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'

describe('Register Service', () => {
  it('should hash user password upon registration', async () => {
    const registerService = new RegisterService({
      async findByEmail() {
        return null
      },
      async create(data) {
        return {
          id: 'user-id',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const password = '123456'

    const { user } = await registerService.execute({
      name: 'test',
      email: 'test@test3.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      user?.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
