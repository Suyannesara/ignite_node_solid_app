import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'

let usersRepository: UsersRepository
let sut: RegisterUseCase

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const password = '123456'

    const { user } = await sut.execute({
      name: 'test',
      email: 'test@test3.com',
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const password = '123456'

    const { user } = await sut.execute({
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
    const email = 'test@test3.com'

    await sut.execute({
      name: 'test',
      email,
      password: '123456',
    })

    // expect the promisse to be rejected an trhows an instance of the error
    await expect(() =>
      sut.execute({
        name: 'test',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
