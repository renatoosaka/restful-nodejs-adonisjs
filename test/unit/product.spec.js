'use strict'

const { test, trait, before } = use('Test/Suite')('Category')

const User = use('App/Models/User')
const Category = use('App/Models/Category')
const Product = use('App/Models/Product')

const Logger = use('Logger')

trait('Test/ApiClient')
trait('Auth/Client')

before(async () => {
  await User.truncate()
  await User.create({ email: 'vedovelli@gmail.com', password: '123456' })
  
  await Category.truncate()
  await Category.create({ name: 'category-test' })

  await Product.truncate()
})

test('lista de produto', async ({ assert, client }) => {
  const user = await User.find(1)

  const response = await client
                          .get('/produto')
                          .loginVia(user, 'jwt')
                          .end()

  response.assertStatus(200)
})


test('criação de produto', async ({ assert, client }) => {
  const user = await User.find(1)

  const response = await client
                          .post('/produto')
                          .send({
                            name: 'product-test',
                            category_id: 1
                          })
                          .loginVia(user, 'jwt')
                          .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    product: {
      name: 'product-test',
      id: 1
    }
  })
})

test('atualização de produto', async ({ assert, client }) => {
  const user = await User.find(1)

  const response = await client
                          .put('/produto')
                          .send({
                            name: 'product-test-updated',
                            category_id: 1,
                            id: 1
                          })
                          .loginVia(user, 'jwt')
                          .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    product: {
      name: 'product-test-updated',
      id: 1
    }
  })
})

test('remoção de produto', async ({ assert, client }) => {
  const user = await User.find(1)

  const response = await client
                          .delete('/produto/1')
                          .loginVia(user, 'jwt')
                          .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    product: {
      name: 'product-test-updated',
      id: 1
    },
    message: 'Produto removido com sucesso!'
  })
})