'use strict'

const { test, trait, before } = use('Test/Suite')('Auth')

const User = use('App/Models/User')

trait('Test/ApiClient')

before(async () => {
  await User.truncate()
  await User.create({ email: 'vedovelli@gmail.com', password: '123456' })
})

test('get token', async ({ assert, client }) => {
 
  const response = await client
                          .post('/autenticacao')
                          .send({
                            email: 'vedovelli@gmail.com',
                            senha: '123456'
                          })
                          .end()

  response.assertStatus(200)
})

test('get token error', async ({ assert, client }) => {

  const response = await client
    .post('/autenticacao')
    .send({
      email: 'wrong@email.com',
      senha: '123456'
    })
    .end()

  response.assertStatus(500)
})