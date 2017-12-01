'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async all () {
    return { products: await Product.query().with('category').fetch() }
  }

  async list({ params }) {
    return { products: await Product.query().where('category_id', params.id ).with('category').fetch() }
  }  

  async one({ params }) {
    return { product: await Product.find( params.id ) }
  }  

  async save({ request }) {
    const productData = request.only([ 'name', 'category_id' ])
    const product = await Product.create(productData)

    return { product, category: await product.category().fetch() }
  }  

  async update({ request }) {
    const { id, name, category_id } = request.all()

    const product = await Product.find(id)

    product.name = name
    product.category_id = category_id

    await product.save()

    return { product, category: await product.category().fetch() }
  }  

  async delete({ params }) {
    const product = await Product.find(params.id)

    await product.delete()

    return {
      product,
      message: 'Produto removido com sucesso!'
    }
  }  
}

module.exports = ProductController
