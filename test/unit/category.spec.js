'use strict'

const { test, trait, before } = use('Test/Suite')('Category')

const User = use('App/Models/User')
const Category = use('App/Models/Category')
const Product = use('App/Models/Product')

const Logger = use('Logger')

trait('Test/ApiClient')
// trait('Session/Client')
trait('Auth/Client')

before(async () => {
  await User.truncate()
  await User.create({ email: 'vedovelli@gmail.com', password: '123456' })

  await Category.truncate()
})

test('criação de categoria', async ({ assert, client }) => {
const user = await User.find(1)

const response = await client
                        .post('/categoria')
                        .send({
                          name: 'category-test'
                        })
                        .loginVia(user, 'jwt')
                        .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    category: {
      name: 'category-test',
      id: 1
    }
  })
})

test('lista de categoria', async ({ assert, client }) => {
  const user = await User.find(1)

  const response = await client
                          .get('/categoria')
                          .loginVia(user, 'jwt')
                          .end()

  response.assertStatus(200)
})

test('atualização de categoria', async ({ assert, client }) => {
  const user = await User.find(1)

  const response = await client
                          .put('/categoria')
                          .send({
                            name: 'category-test-updated',
                            id: '1'
                          })
                          .loginVia(user, 'jwt')
                          .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    category: {
      name: 'category-test-updated',
      id: 1
    }
  })
})

test('remoção de categoria', async ({ assert, client }) => {
  const user = await User.find(1)

  const response = await client
                          .delete('/categoria/1')
                          .loginVia(user, 'jwt')
                          .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    category: {
      name: 'category-test-updated',
      id: 1
    },
    message: 'Categoria removida com sucesso!'
  })
})