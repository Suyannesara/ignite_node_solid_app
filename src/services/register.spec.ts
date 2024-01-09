import { expect, describe, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Service', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const password = '123456'

    const { user } = await registerService.execute({
      name: 'test',
      email: 'test@test3.com',
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

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

  it('should not be able to register with email already in database', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const email = 'test@test3.com'

    await registerService.execute({
      name: 'test',
      email,
      password: '123456',
    })

    // expect the promisse to be rejected an trhows an instance of the error
    expect(async () => {
      await registerService.execute({
        name: 'test',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
