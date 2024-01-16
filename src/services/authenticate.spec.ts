import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    // sut -> system under test
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const password = '123456'
    const email = 'test@test3.com'

    await usersRepository.create({
      id: 'someId',
      name: 'test',
      email,
      password_hash: await hash(password, 6),
    })

    const { user } = await sut.execute({
      email,
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const password = '123456'

    await usersRepository.create({
      id: 'someId',
      name: 'test',
      email: 'test@test.com',
      password_hash: await hash(password, 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'testwrong@test.com',
        password,
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'test@test.com'

    await usersRepository.create({
      id: 'someId',
      name: 'test',
      email,
      password_hash: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email,
        password: '123123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
